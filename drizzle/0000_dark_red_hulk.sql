CREATE TABLE `admin_logs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`admin_id` int,
	`action` varchar(100) NOT NULL,
	`target_entity` varchar(100),
	`target_id` int,
	`details` text,
	`ip_address` varchar(45),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` text NOT NULL,
	`role` enum('SUPER_ADMIN','ADMIN','EDITOR') NOT NULL DEFAULT 'EDITOR',
	`is_active` int NOT NULL DEFAULT 1,
	`last_login_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `analytics_events` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`event_name` varchar(100) NOT NULL,
	`metadata` json,
	`language` varchar(10),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analytics_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_submissions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`subject` varchar(255),
	`message` text NOT NULL,
	`status` enum('NEW','IN_PROGRESS','RESOLVED','ARCHIVED') NOT NULL DEFAULT 'NEW',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_library` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`url` text NOT NULL,
	`mime_type` varchar(100) NOT NULL,
	`size_in_bytes` int NOT NULL,
	`alt_text_fr` varchar(255),
	`alt_text_en` varchar(255),
	`alt_text_sg` varchar(255),
	`uploaded_by` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_library_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_views` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`page_url` varchar(255) NOT NULL,
	`language` varchar(10) NOT NULL,
	`device_type` enum('DESKTOP','MOBILE','TABLET') NOT NULL DEFAULT 'DESKTOP',
	`user_agent` text,
	`ip_hash` varchar(64),
	`country` varchar(100),
	`visited_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_sections` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`section_key` varchar(100) NOT NULL,
	`title_fr` varchar(255),
	`title_en` varchar(255),
	`title_sg` varchar(255),
	`content_fr` text,
	`content_en` text,
	`content_sg` text,
	`image_id` int,
	`updated_by` int,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_sections_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_sections_section_key_unique` UNIQUE(`section_key`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`setting_key` varchar(100) NOT NULL,
	`setting_value` text NOT NULL,
	`description` varchar(255),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_settings_setting_key_unique` UNIQUE(`setting_key`)
);
--> statement-breakpoint
ALTER TABLE `admin_logs` ADD CONSTRAINT `admin_logs_admin_id_admin_users_id_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin_users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `media_library` ADD CONSTRAINT `media_library_uploaded_by_admin_users_id_fk` FOREIGN KEY (`uploaded_by`) REFERENCES `admin_users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `site_sections` ADD CONSTRAINT `site_sections_image_id_media_library_id_fk` FOREIGN KEY (`image_id`) REFERENCES `media_library`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `site_sections` ADD CONSTRAINT `site_sections_updated_by_admin_users_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `admin_users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `event_name_idx` ON `analytics_events` (`event_name`);--> statement-breakpoint
CREATE INDEX `visited_at_idx` ON `page_views` (`visited_at`);--> statement-breakpoint
CREATE INDEX `page_url_idx` ON `page_views` (`page_url`);