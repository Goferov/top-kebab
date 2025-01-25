--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Debian 15.10-1.pgdg120+1)
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: mydatabase; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE mydatabase WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE mydatabase OWNER TO root;

\connect mydatabase

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.addresses (
    id bigint NOT NULL,
    street character varying(255) NOT NULL,
    city character varying(128) NOT NULL,
    postal_code character varying(32) NOT NULL,
    house_no character varying(32) NOT NULL,
    apartment_no character varying(32),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.addresses OWNER TO root;

--
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addresses_id_seq OWNER TO root;

--
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- Name: cache; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO root;

--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO root;

--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO root;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO root;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: job_batches; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO root;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO root;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO root;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO root;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO root;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO root;

--
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO root;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_access_tokens_id_seq OWNER TO root;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.restaurants (
    id bigint NOT NULL,
    address_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    image character varying(255),
    email character varying(255),
    website character varying(255),
    phone character varying(16),
    publicate boolean DEFAULT false NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.restaurants OWNER TO root;

--
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.restaurants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.restaurants_id_seq OWNER TO root;

--
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.reviews (
    id bigint NOT NULL,
    restaurant_id bigint NOT NULL,
    user_id bigint NOT NULL,
    rate integer NOT NULL,
    review text NOT NULL,
    publicate boolean DEFAULT false NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.reviews OWNER TO root;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO root;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.roles OWNER TO root;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO root;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO root;

--
-- Name: users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    role_id bigint DEFAULT '2'::bigint NOT NULL
);


ALTER TABLE public.users OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.addresses (id, street, city, postal_code, house_no, apartment_no, created_at, updated_at) VALUES (1, '63643 Russel Well Suite 082', 'Lake Celia', '20762', '626', '13', '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.addresses (id, street, city, postal_code, house_no, apartment_no, created_at, updated_at) VALUES (2, '2991 Caroline Hills Apt. 522', 'New Amelieberg', '26772', '53973', '30', '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.addresses (id, street, city, postal_code, house_no, apartment_no, created_at, updated_at) VALUES (3, '96989 Breitenberg Knoll', 'East Claudieland', '77196', '69740', '50', '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.addresses (id, street, city, postal_code, house_no, apartment_no, created_at, updated_at) VALUES (4, '6700 Rath Groves Suite 705', 'East Hardyburgh', '74878-4637', '779', '87', '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.addresses (id, street, city, postal_code, house_no, apartment_no, created_at, updated_at) VALUES (5, '661 Ivah Court', 'Gorczanyton', '38660-3555', '312', NULL, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.addresses (id, street, city, postal_code, house_no, apartment_no, created_at, updated_at) VALUES (6, '682 Hauck Viaduct', 'Lake Stella', '70962', '5520', '62', '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.addresses (id, street, city, postal_code, house_no, apartment_no, created_at, updated_at) VALUES (7, '5434 Riley Coves Apt. 777', 'Greenfeldermouth', '46227-6258', '27920', '41', '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.addresses (id, street, city, postal_code, house_no, apartment_no, created_at, updated_at) VALUES (8, '88969 Cooper Lakes', 'Ednashire', '03033-3864', '444', '50', '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.addresses (id, street, city, postal_code, house_no, apartment_no, created_at, updated_at) VALUES (9, '52515 Bryon Fork Apt. 532', 'North Jefferymouth', '79585-6979', '114', NULL, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.addresses (id, street, city, postal_code, house_no, apartment_no, created_at, updated_at) VALUES (10, '781 Howell Mountains', 'New Rosendo', '13555', '41612', NULL, '2025-01-25 18:53:23', '2025-01-25 18:53:23');


--
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.migrations (id, migration, batch) VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO public.migrations (id, migration, batch) VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO public.migrations (id, migration, batch) VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO public.migrations (id, migration, batch) VALUES (4, '2024_12_11_194000_create_addresses_table', 1);
INSERT INTO public.migrations (id, migration, batch) VALUES (5, '2024_12_11_194307_create_restaurants_table', 1);
INSERT INTO public.migrations (id, migration, batch) VALUES (6, '2024_12_11_205913_create_reviews_table', 1);
INSERT INTO public.migrations (id, migration, batch) VALUES (7, '2024_12_12_210555_create_personal_access_tokens_table', 1);
INSERT INTO public.migrations (id, migration, batch) VALUES (8, '2024_12_22_233242_create_roles_table', 1);
INSERT INTO public.migrations (id, migration, batch) VALUES (9, '2024_12_22_234053_add_role_id_to_users_table', 1);


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) VALUES (1, 'App\Models\User', 11, 'api-token', '3f22ab05fd06924fc12a77c74142c0faf0a94092a6ff802fdaeb061715f1ef39', '["*"]', '2025-01-25 18:56:29', NULL, '2025-01-25 18:54:57', '2025-01-25 18:56:29');


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.restaurants (id, address_id, name, description, image, email, website, phone, publicate, created_at, updated_at) VALUES (2, 2, 'Kuvalis Inc', 'Suscipit voluptas eos a et rerum doloremque aut delectus. Molestiae consequatur exercitationem molestias et. Rem deserunt eum deserunt qui et vel perspiciatis. Aut ratione quo autem.', '', 'west.remington@example.org', 'schuppe.com', '+1-785-231-2716', true, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.restaurants (id, address_id, name, description, image, email, website, phone, publicate, created_at, updated_at) VALUES (3, 3, 'Zemlak and Sons', 'Molestias qui debitis molestias quisquam nihil ea quas. Qui occaecati tenetur tempore vel. Exercitationem facilis error voluptate provident omnis repellendus.', '', 'octavia31@example.net', 'dare.org', '352-604-4715', true, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.restaurants (id, address_id, name, description, image, email, website, phone, publicate, created_at, updated_at) VALUES (4, 4, 'Schimmel, Schultz and Bashirian', 'Accusantium voluptate dicta vel cupiditate explicabo. Laborum saepe corporis accusantium et est doloremque. Quo facere iure est voluptatem. Nobis doloremque consectetur quae odit.', '', 'maritza24@example.com', 'dach.com', '(681) 267-0222', true, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.restaurants (id, address_id, name, description, image, email, website, phone, publicate, created_at, updated_at) VALUES (5, 5, 'Hartmann Inc', 'Quo omnis maiores sed. Sit fugit possimus velit temporibus dignissimos. Iure aliquid voluptates aut dicta non voluptatem.', '', 'neoma18@example.org', 'lehner.org', '+1 (313) 301-588', true, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.restaurants (id, address_id, name, description, image, email, website, phone, publicate, created_at, updated_at) VALUES (6, 6, 'Bayer-Fisher', 'Assumenda dolorem et cumque beatae ea. Iure incidunt officiis suscipit aliquam. Culpa rerum aut doloribus dolorem non. Eum corporis et provident.', '', 'everardo62@example.org', 'hammes.net', '(283) 839-1444', true, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.restaurants (id, address_id, name, description, image, email, website, phone, publicate, created_at, updated_at) VALUES (7, 7, 'Cassin LLC', 'Enim autem sit possimus officia. Perspiciatis aut earum reiciendis fuga laudantium et officiis. Tempora suscipit magni earum.', '', 'jada.mills@example.com', 'torp.com', '+13032148926', true, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.restaurants (id, address_id, name, description, image, email, website, phone, publicate, created_at, updated_at) VALUES (8, 8, 'Jones-Prosacco', 'A suscipit qui cum excepturi molestiae eius. Eos eligendi ducimus culpa labore dolores. Necessitatibus perspiciatis quis odio voluptates doloremque. Aliquam nostrum aliquam aliquam consequatur explicabo.', '', 'bsporer@example.org', 'wunsch.com', '773.712.4334', false, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.restaurants (id, address_id, name, description, image, email, website, phone, publicate, created_at, updated_at) VALUES (9, 9, 'Hane LLC', 'Qui itaque itaque omnis vel expedita. Esse quia atque sed earum. Numquam ipsum id dignissimos et ex quidem quisquam.', '', 'larson.mellie@example.org', 'runolfsson.com', '248.229.5341', true, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.restaurants (id, address_id, name, description, image, email, website, phone, publicate, created_at, updated_at) VALUES (10, 10, 'Gislason PLC', 'Dolorem culpa nulla et velit ea repellendus. Velit aspernatur quis consequuntur neque id. Praesentium et eos accusantium.', '', 'floy46@example.net', 'deckow.net', '+1-283-723-3192', true, '2025-01-25 18:53:23', '2025-01-25 18:53:23');
INSERT INTO public.restaurants (id, address_id, name, description, image, email, website, phone, publicate, created_at, updated_at) VALUES (1, 1, 'Reinger, Rice and Gorczany', 'Occaecati laborum ratione in labore voluptates harum odio deserunt. Dicta quae quisquam ea rem placeat voluptates. Eos velit consequuntur commodi aliquid quis porro. Dolore odio vel dolorum sunt soluta et.', '', 'qboyle@example.org', 'adams.com', '567-352-5201', true, '2025-01-25 18:53:23', '2025-01-25 18:55:46');


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (1, 1, 1, 4, 'Est ut qui et ut quia repellendus quaerat. Vero quod impedit enim aspernatur tempora explicabo dolor. Ad rerum blanditiis in ad dicta aut.', true, '2024-05-14 12:24:13', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (2, 3, 1, 2, 'Omnis accusamus qui dicta doloribus illo accusamus labore. Voluptates rerum iusto necessitatibus veritatis possimus rem.', true, '2024-02-06 06:04:21', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (3, 4, 1, 1, 'Voluptatem a est qui et. Tempore commodi repudiandae voluptatem error autem. Eveniet illo ipsum consequatur totam eos. Earum dolores quos blanditiis rerum et ab.', true, '2024-09-11 19:34:08', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (4, 5, 2, 4, 'Nihil reiciendis voluptatem ut placeat a nihil assumenda. Vel reiciendis qui quod ab. Molestias eos sequi libero aut delectus assumenda. Qui expedita et culpa vel ipsum.', true, '2024-04-04 14:46:37', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (5, 8, 2, 4, 'Ipsum ut laudantium vel ut repellat occaecati. Repudiandae nam quisquam qui enim ut nesciunt sit. Ut enim sit neque dolor non.', true, '2024-07-31 10:38:17', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (6, 10, 2, 5, 'Omnis aliquid rerum ea dolor et vel. Et illum voluptatem optio et voluptatibus libero. Sed consequuntur est amet et. Odit perspiciatis quo sed aut possimus. Fugiat eos adipisci voluptatem optio dolorum.', true, '2024-05-24 23:22:47', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (7, 6, 3, 3, 'Rerum et ex et dolor autem necessitatibus. Numquam consequuntur iure saepe autem. Voluptas eius libero rem voluptas rerum et quisquam. Voluptatem rerum esse libero alias sed incidunt et eligendi.', true, '2024-10-08 10:04:18', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (8, 7, 3, 1, 'Est rerum placeat enim corporis voluptatibus illo sed. Iure molestiae officiis sit et atque quia. Cumque quos ut voluptatem.', true, '2024-06-30 04:13:40', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (9, 8, 3, 1, 'Velit dicta eos voluptatem culpa consequatur. Voluptatum dolor voluptatem culpa quibusdam. Quibusdam recusandae nam culpa aut. Assumenda necessitatibus fugiat sint qui est et.', true, '2024-07-02 06:26:40', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (10, 2, 4, 4, 'Neque non ut amet enim voluptatibus. Alias voluptatem odit vel earum non et ipsam molestiae. Qui asperiores totam error facere dolores occaecati illo. Eum non quisquam suscipit omnis ullam molestias. Eum minus commodi ea.', true, '2024-05-06 22:08:45', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (11, 3, 4, 3, 'Aliquid et ipsa sapiente aut in facilis quaerat perspiciatis. Facilis tenetur eos sunt quas quae itaque molestiae. Eligendi rerum sit ut aperiam in et repellendus. Amet recusandae ut incidunt impedit.', true, '2024-04-01 12:43:10', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (12, 6, 4, 1, 'Magnam eos quod consequuntur est ut impedit explicabo. Quo dicta et ipsum est. Pariatur et doloremque optio illum hic vel.', true, '2024-05-04 16:29:26', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (13, 2, 5, 2, 'Quidem quas doloremque voluptatibus et. Et temporibus consequatur error blanditiis nisi. Et fugit ratione qui ratione quae. Voluptates expedita alias non assumenda sed non numquam. Quibusdam alias non esse reprehenderit mollitia beatae et.', true, '2024-08-22 16:23:37', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (14, 4, 5, 3, 'Et ad hic atque esse non. Sint ut ut consectetur dolores voluptas asperiores officiis. Sint architecto deserunt vitae accusamus aliquid reiciendis aliquam dignissimos.', true, '2024-07-30 13:01:45', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (15, 10, 5, 4, 'Tenetur itaque ullam necessitatibus saepe ut reprehenderit ea atque. Voluptate exercitationem vero qui nobis qui doloremque amet. Qui consequatur aut dolores qui illum doloribus ut rem. Enim reprehenderit architecto odit omnis rerum tempore animi.', true, '2024-06-27 21:07:40', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (16, 3, 6, 1, 'Et dolor sit autem et quisquam quas qui. Modi beatae dicta magnam architecto eos explicabo.', true, '2024-05-22 16:12:03', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (17, 4, 6, 3, 'Delectus ducimus minima aspernatur veritatis. Dolorem iure praesentium hic tempora cum enim enim sint. Soluta enim velit minima beatae.', true, '2024-05-02 02:09:11', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (18, 5, 6, 2, 'Quibusdam sunt et cum cum cumque eveniet. Quasi fugit tenetur cumque sit reiciendis. At est dicta ab veritatis est velit quos. Voluptas dolores quidem optio.', true, '2024-11-15 03:16:03', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (19, 1, 7, 1, 'Molestiae est voluptatem in quo quas. Nulla incidunt nisi sunt accusantium est et laborum. Quam asperiores consequatur laudantium et sed.', true, '2024-03-14 19:09:27', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (20, 7, 7, 2, 'Mollitia sed possimus similique iusto amet quia. Odit qui vel ad iusto alias excepturi. Sint error molestiae ad ut praesentium aut. Cum non accusamus cum. Et quisquam praesentium fugit numquam totam.', true, '2024-09-17 10:54:34', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (21, 8, 7, 5, 'Ad corrupti voluptatum voluptates sit reprehenderit voluptatibus. Quaerat et animi aut. Sed ex harum voluptas maiores voluptas et.', true, '2025-01-12 18:15:03', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (22, 1, 8, 2, 'Qui dolor eveniet earum et perferendis officiis vel. Quis quo aspernatur saepe aliquid. Omnis blanditiis dicta non veritatis itaque cumque aliquid. Error aut illo accusamus provident ab neque.', true, '2024-12-16 12:58:46', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (23, 6, 8, 2, 'Voluptatem fugit ratione possimus animi qui dolore est nemo. Id dolorum dignissimos voluptas accusantium aut. Et fuga aut eveniet ullam qui sed qui. Quia id sunt modi quas quos.', true, '2024-03-28 13:30:05', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (24, 7, 8, 1, 'Incidunt omnis assumenda qui hic officiis eligendi. Ducimus repellendus non iure eveniet mollitia.', true, '2024-05-16 15:17:28', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (25, 2, 9, 4, 'Harum deleniti qui sit vel earum est. Impedit officiis in placeat odit quo dolorem. Iste voluptatibus nihil illo qui voluptatum quis.', true, '2024-03-21 19:09:49', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (26, 5, 9, 5, 'Repellendus aperiam corrupti ad nulla error rerum aspernatur. Rerum non voluptatem odit aliquid possimus. Eius tempora voluptas nihil dignissimos voluptas quae esse totam.', true, '2024-11-16 21:08:52', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (27, 10, 9, 2, 'Consequuntur non doloribus incidunt voluptatem. Aliquid est in necessitatibus qui occaecati quaerat. Est autem debitis nulla eos delectus omnis sapiente.', true, '2025-01-17 03:36:59', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (28, 1, 10, 5, 'Quam quidem dignissimos molestiae non omnis ducimus. Non accusantium a vel. Illo corporis aperiam facere nostrum.', true, '2024-05-25 08:19:47', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (29, 7, 10, 1, 'At recusandae aut maxime. Nemo voluptatibus molestiae consequatur animi laboriosam expedita magni. Delectus animi nulla explicabo incidunt doloremque qui earum cumque. Iusto autem earum velit dolores autem et.', true, '2024-05-20 11:39:52', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (30, 10, 10, 2, 'Sequi amet et est nisi. Modi sunt blanditiis aut fugiat fugiat. Cupiditate ut nihil praesentium aut.', true, '2024-02-19 05:08:18', '2025-01-25 18:53:23');
INSERT INTO public.reviews (id, restaurant_id, user_id, rate, review, publicate, created_at, updated_at) VALUES (31, 3, 11, 1, 'Słaba', false, '2025-01-25 18:56:22', '2025-01-25 18:56:22');


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.roles (id, name, created_at, updated_at) VALUES (1, 'admin', '2025-01-25 18:53:20', '2025-01-25 18:53:20');
INSERT INTO public.roles (id, name, created_at, updated_at) VALUES (2, 'user', '2025-01-25 18:53:20', '2025-01-25 18:53:20');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (1, 'Jadon Gerlach', 'hahn.grant@example.com', '2025-01-25 18:53:22', '$2y$12$j5QCr.zVJ7Lbsr303yjM8ev1k6xmhaqU3FBUun6IVKfpr4BAUM7MO', 'xE9lmZk5kr', '2025-01-25 18:53:22', '2025-01-25 18:53:22', 2);
INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (2, 'Evan Stamm', 'eboyle@example.net', '2025-01-25 18:53:22', '$2y$12$j5QCr.zVJ7Lbsr303yjM8ev1k6xmhaqU3FBUun6IVKfpr4BAUM7MO', '2r8xgq1u1S', '2025-01-25 18:53:22', '2025-01-25 18:53:22', 2);
INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (3, 'Prof. Julius Fadel', 'era.reichert@example.net', '2025-01-25 18:53:22', '$2y$12$j5QCr.zVJ7Lbsr303yjM8ev1k6xmhaqU3FBUun6IVKfpr4BAUM7MO', 'YeTdRp9EBi', '2025-01-25 18:53:22', '2025-01-25 18:53:22', 2);
INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (4, 'Mrs. Mozelle Gleichner', 'jacobson.conor@example.com', '2025-01-25 18:53:22', '$2y$12$j5QCr.zVJ7Lbsr303yjM8ev1k6xmhaqU3FBUun6IVKfpr4BAUM7MO', 'mHCThb3P5D', '2025-01-25 18:53:22', '2025-01-25 18:53:22', 2);
INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (5, 'Tre Hickle Sr.', 'joey24@example.com', '2025-01-25 18:53:22', '$2y$12$j5QCr.zVJ7Lbsr303yjM8ev1k6xmhaqU3FBUun6IVKfpr4BAUM7MO', 'tWYm5c7ikM', '2025-01-25 18:53:22', '2025-01-25 18:53:22', 2);
INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (6, 'Prof. Bryce Kuvalis III', 'veda36@example.com', '2025-01-25 18:53:22', '$2y$12$j5QCr.zVJ7Lbsr303yjM8ev1k6xmhaqU3FBUun6IVKfpr4BAUM7MO', 'enf0vdElRY', '2025-01-25 18:53:22', '2025-01-25 18:53:22', 2);
INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (7, 'Rodrigo Murphy', 'sporer.gerard@example.org', '2025-01-25 18:53:22', '$2y$12$j5QCr.zVJ7Lbsr303yjM8ev1k6xmhaqU3FBUun6IVKfpr4BAUM7MO', 'esHsgLcECo', '2025-01-25 18:53:22', '2025-01-25 18:53:22', 2);
INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (8, 'Roel Bauch Sr.', 'daren.sanford@example.org', '2025-01-25 18:53:22', '$2y$12$j5QCr.zVJ7Lbsr303yjM8ev1k6xmhaqU3FBUun6IVKfpr4BAUM7MO', '0qO1PdEY2m', '2025-01-25 18:53:22', '2025-01-25 18:53:22', 2);
INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (9, 'Stefan Heller', 'kertzmann.elnora@example.org', '2025-01-25 18:53:22', '$2y$12$j5QCr.zVJ7Lbsr303yjM8ev1k6xmhaqU3FBUun6IVKfpr4BAUM7MO', 'n6BbBjVyj2', '2025-01-25 18:53:23', '2025-01-25 18:53:23', 2);
INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (10, 'Ivah Rice', 'bartoletti.brooklyn@example.net', '2025-01-25 18:53:22', '$2y$12$j5QCr.zVJ7Lbsr303yjM8ev1k6xmhaqU3FBUun6IVKfpr4BAUM7MO', 'MRn7YkJu32', '2025-01-25 18:53:23', '2025-01-25 18:53:23', 2);
INSERT INTO public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at, role_id) VALUES (11, 'Marcin', 'marcin@test.pl', NULL, '$2y$12$aL6JOgwCrVfA32vDjqkvy.8rynCpQWe21RMN1W3qtoPh0d9QCt84O', NULL, '2025-01-25 18:54:54', '2025-01-25 18:54:54', 1);


--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.addresses_id_seq', 10, true);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.migrations_id_seq', 9, true);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, true);


--
-- Name: restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.restaurants_id_seq', 10, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.reviews_id_seq', 31, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_unique; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_unique UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- Name: restaurants restaurants_address_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_address_id_foreign FOREIGN KEY (address_id) REFERENCES public.addresses(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_restaurant_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_restaurant_id_foreign FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id);


--
-- Name: reviews reviews_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users users_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

