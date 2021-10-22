drop schema if exists public cascade; 
create schema if not exists public; 
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;	

CREATE TYPE currency AS ENUM 
('USD', 'IDR', 'SGD', 'MYR');

CREATE TYPE subscription_status AS ENUM 
('UNCONFIRMED', 'PENDING_CONVERSION', 'PENDING_TDA_FUND', 'CONFIRMED', 'FAILED');
 
CREATE TYPE gender AS ENUM 
('MALE', 'FEMALE', 'OTHER' );

CREATE TYPE account_type AS ENUM 
('PERSONAL', 'INSTITUTIONAL', 'OTHER' );

CREATE TYPE attachment_type AS ENUM 
('ID_CARD', 'TAX_CARD', 'PHOTO', 'SUBSCRIPTION_AGREEMENT', 'COMPANY_REGISTRATION', 'OTHER');

CREATE TYPE activity_type AS ENUM 
('SUBSCRIPTION', 'WITHDRAWAL', 'PERFORMANCE_FEE', 'PENALTY_FEE');

CREATE TYPE reference_table AS ENUM 
('deposit', 'withdrawal', 'investment_activity', 'tda_movement');

create table users (
	id 		serial primary key, 
	uuid		uuid DEFAULT public.gen_random_uuid() NOT NULL,
	
	username 	text not null default '',
	password	text not null,	
	email		text not null,
	
	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null	
);
create unique index user_username on users(username) where deleted_at is null;

create table product (
	id			serial primary key,

	product_name		text not null default '',
	product_description	text not null default '',
	performance_fee		numeric(32,12) not null default 20,
	penalty_fee		numeric(32,12) not null default 10,
	
	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null
);
create unique index product_name on product(product_name) where deleted_at is null;

create table account (
	id                              serial primary key, 
	uuid		                    uuid DEFAULT public.gen_random_uuid() NOT NULL,

    account_type                    account_type not null default 'PERSONAL'::account_type,

	primary_email 		            text not null default '',
	primary_name		            text not null default '',	
	primary_identification_number	text not null default '',
	primary_tax_number	            text not null default '',
	primary_phone1		            text not null default '',
	primary_phone2	                text not null default '',	
	primary_address		            text not null default '',
	primary_city		            text not null default '',
	primary_province	            text not null default '',	
	primary_country		            text not null default '',
	primary_zipcode		            text not null default '',
    primary_gender                  gender not null,    
    primary_birth_place             text not null default '',
	primary_birth_date              timestamptz null, 
	

	secondary_email 	            text not null default '',
	secondary_name		            text not null default '',
	secondary_identification_number	text not null default '',
	secondary_tax_number	        text not null default '',
	secondary_phone1		        text not null default '',
	secondary_phone2		        text not null default '',	
	secondary_address		        text not null default '',
	secondary_city			        text not null default '',
	secondary_province		        text not null default '',	
	secondary_country		        text not null default '',
	secondary_zipcode		        text not null default '',
    secondary_gender		        gender not null,
    secondary_birth_place           text not null default '',
	secondary_birth_date            timestamptz null, 
	
	
	
	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null
);
create unique index account_email on account(primary_email) where deleted_at is null;



INSERT INTO account (primary_email, name, gender, birthdate) SELECT generate_series || '@reserved.com', generate_series, 'INSTITUTION'::gender, '1970-01-01' from generate_series(1,100);
update account set primary_email = 'company@ravtel.com', name = 'Company Fund' where id = 1;
update account set primary_email = 'founder@ravtel.com', name = 'Founders Fund' where id = 2;
update account set primary_email = 'premier.index.alpha@ravtel.com', name = 'Premier Index Alpha' where id = 10;
--vacuum full account;



create table account_attachment (
	id 		serial primary key, 

	account_id	int not null references account(id),
	attachment_type	attachment_type not null,
	s3_url		text not null,	
	
	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null
);

create table account_bank (
	id 		            serial primary key, 

	account_id	        int not null references account(id),

	bank_name	        text not null,	
	bank_branch	        text not null,	
	swift_code	        text not null,	
	currency	        terrency not null,	
	account_name	    text not null,	
	account_number	    text not null,	
	is_primary	        boolean default false,
		
	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null
);
 

create table subscription (
	id			            bigserial primary key,

	product_id		        int null references product(id),
	account_id		        int not null references account(id),	
	
	intial_currency		    currency not null, 
	intial_amount		    numeric(32,12) not null, 

	converted_currency	    currency not null,
	converted_amount	    numeric(32,12) not null, 

	subscription_status	    subscription_status not null default 'NEW'::subscription_status,	
	proof			        text not null,
	

	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null
);


create table investment (
	id			        bigserial primary key,

	account_id		    int not null references account(id),	
	product_id		    int not null references product(id),	

	last_unit_amount	numeric(32,12) not null,
	hwm			        numeric(32,12) not null,

	performance_fee_percent	numeric(32,12) not null,
	penalty_fee_percent	numeric(32,12) not null,

	investment_date		timestamptz not null,
	next_performance_fee_date	timestamptz not null,
	maturity_date		timestamptz not null,
	
	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null
);

create table investment_activity (
	id			        bigserial primary key,

	investment_id		int not null references investment(id),	
	activity_type		activity_type not null,

	unit_amount		    numeric(32,12) not null,
	hwm			        numeric(32,12) not null,

	currency		    currency not null,
	currency_amount		numeric(32,12) not null,

	description		    text not null default '',

	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null
);




create table nav (
	id 		    bigserial primary key,

	product_id	int not null references product(id),
	nav_date	timestamptz not null,
	nlv		    numeric(32,12) not null,
	total_unit	numeric(32,12) not null,
	nav_price	numeric(32,12) not null,
	change		numeric(32,12) not null,
	ytd_return	numeric(32,12) not null,	
	
	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null
);

create table fund (
	id 		    bigserial primary key,
	
	account_id	int not null references account(id),	
	balance		numeric(32,12) not null,

	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null
);

create unique index fund_account on fund(account_id) where deleted_at is null;

create table ledger (
	id			bigserial primary key,
	
	account_id		int not null references account(id),	
	event_code		text not null default '', -- event enum dari code, misal checks untuk WITHDRAWAL

	transaction_date	timestamptz not null default now(),
	debit			numeric(32,12) not null, -- constraint one must be zero
	credit			numeric(32,12) not null, -- constraint one must be zero
	balance			numeric(32,12) not null,
	info			text not null,	

	reference_table		reference_table null,
	reference_id		int null, 
	
	created_at 	timestamptz not null default now(),
	created_by	text not null default '', 
	updated_at 	timestamptz not null default now(),
	updated_by 	text not null default '', 
	deleted_at 	timestamptz null,
	deleted_by 	text null, 
	metadata	jsonb null
);





