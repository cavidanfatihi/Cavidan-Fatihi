CREATE TABLE `booking_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`email` varchar(320) NOT NULL,
	`inquiryType` enum('event','birthday','corporate','wedding','project','general') NOT NULL,
	`message` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `booking_requests_id` PRIMARY KEY(`id`)
);
