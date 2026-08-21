import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/contexts/LocaleContext";
import { trpc } from "@/lib/trpc";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type InquiryType = "event" | "birthday" | "corporate" | "wedding" | "project" | "general";
type BookingValues = { name: string; email: string; inquiryType: InquiryType; message: string };

const strings = {
  az: {
    name: "Adınız", email: "E-poçt", type: "Müraciətin növü", message: "Mesajınız", send: "Müraciəti göndər", namePlaceholder: "Ad və soyad", messagePlaceholder: "Tarix, məkan və tədbirlə bağlı qısa məlumat yazın.", success: "Müraciətiniz qeydə alındı. Qısa zamanda sizinlə əlaqə saxlanılacaq.", error: "Göndərilmə zamanı xəta baş verdi. Yenidən cəhd edin.", types: { event: "Tədbir / konsert", birthday: "Ad günü", corporate: "Korporativ gecə", wedding: "Toy & nişan", project: "Xüsusi layihə", general: "Ümumi sual" },
  },
  en: {
    name: "Your name", email: "Email", type: "Enquiry type", message: "Your message", send: "Send enquiry", namePlaceholder: "Full name", messagePlaceholder: "Please share the date, venue and a short outline of the event.", success: "Your enquiry has been received. We will be in touch shortly.", error: "Something went wrong. Please try again.", types: { event: "Event / concert", birthday: "Birthday", corporate: "Corporate event", wedding: "Wedding & engagement", project: "Special project", general: "General enquiry" },
  },
} as const;

export function BookingForm({ locale }: { locale: Locale }) {
  const copy = strings[locale];
  const [status, setStatus] = useState<string | null>(null);
  const form = useForm<BookingValues>({ defaultValues: { name: "", email: "", inquiryType: "event", message: "" } });
  const submitInquiry = trpc.contact.send.useMutation({
    onSuccess: () => { form.reset(); setStatus(copy.success); },
    onError: error => setStatus(error.message || copy.error),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(values => { setStatus(null); submitInquiry.mutate(values); })} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel className="text-[.68rem] font-semibold uppercase tracking-[.13em] text-zinc-300">{copy.name}</FormLabel><FormControl><Input required placeholder={copy.namePlaceholder} className="h-12 rounded-none border-x-0 border-t-0 border-white/25 bg-transparent px-0 text-sm font-medium tracking-[.03em] text-white placeholder:text-zinc-600 focus-visible:ring-0" {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel className="text-[.68rem] font-semibold uppercase tracking-[.13em] text-zinc-300">{copy.email}</FormLabel><FormControl><Input required type="email" placeholder="you@example.com" className="h-12 rounded-none border-x-0 border-t-0 border-white/25 bg-transparent px-0 text-sm font-medium tracking-[.03em] text-white placeholder:text-zinc-600 focus-visible:ring-0" {...field} /></FormControl><FormMessage /></FormItem>} />
        </div>
        <FormField control={form.control} name="inquiryType" render={({ field }) => <FormItem><FormLabel className="text-[.68rem] font-semibold uppercase tracking-[.13em] text-zinc-300">{copy.type}</FormLabel><FormControl><select className="h-12 w-full rounded-none border-x-0 border-t-0 border-white/25 bg-transparent px-0 text-sm font-medium tracking-[.03em] text-white outline-none focus:border-white" {...field}>{(Object.keys(copy.types) as InquiryType[]).map(key => <option className="bg-black" key={key} value={key}>{copy.types[key]}</option>)}</select></FormControl><FormMessage /></FormItem>} />
        <FormField control={form.control} name="message" render={({ field }) => <FormItem><FormLabel className="text-[.68rem] font-semibold uppercase tracking-[.13em] text-zinc-300">{copy.message}</FormLabel><FormControl><Textarea required minLength={10} placeholder={copy.messagePlaceholder} className="min-h-30 rounded-none border-x-0 border-t-0 border-white/25 bg-transparent px-0 text-sm font-medium leading-7 tracking-[.03em] text-white placeholder:text-zinc-600 focus-visible:ring-0" {...field} /></FormControl><FormMessage /></FormItem>} />
        <Button type="submit" disabled={submitInquiry.isPending} className="mt-2 h-13 w-fit rounded-none bg-white px-7 text-[.72rem] font-bold uppercase tracking-[.14em] text-black hover:bg-zinc-200">{submitInquiry.isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Send className="mr-2 size-4" />}{copy.send}</Button>
        {status && <p role="status" className="border-l border-white pl-4 text-sm leading-6 text-zinc-300">{status}</p>}
      </form>
    </Form>
  );
}
