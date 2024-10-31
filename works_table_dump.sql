--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

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
-- Name: works; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.works (
    id integer NOT NULL,
    status boolean DEFAULT true NOT NULL,
    title character varying DEFAULT 'Unnamed'::character varying NOT NULL,
    description character varying,
    image_url character varying,
    client_site_url character varying
);


ALTER TABLE public.works OWNER TO postgres;

--
-- Name: works_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.works_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.works_id_seq OWNER TO postgres;

--
-- Name: works_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.works_id_seq OWNED BY public.works.id;


--
-- Name: works id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.works ALTER COLUMN id SET DEFAULT nextval('public.works_id_seq'::regclass);


--
-- Data for Name: works; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.works (id, status, title, description, image_url, client_site_url) FROM stdin;
7	t	Evening	A highly detailed, dystopian industrial factory scene.	uploads/images/1730302952995-678690279.jpg	https://sergey_vasnev.artstation.com/projects/RYn98D
4	f	Spring Day	Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra imperdiet consectetur; feugiat fusce tincidunt facilisis. Eget suscipit eget inceptos turpis orci ultrices. Dis mus sit bibendum eget parturient aenean suspendisse hendrerit. Cursus morbi eleifend nibh ipsum volutpat gravida facilisis. Cras varius maecenas egestas id natoque inceptos. Suscipit non non lobortis interdum eleifend iaculis felis nam posuere. Velit lacinia molestie vehicula dignissim lacus efficitur vel malesuada.	uploads/images/1730303009956-182696786.jpg	https://sergey_vasnev.artstation.com/projects/VJ6RPg
14	f	Night Camp	Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra imperdiet consectetur; feugiat fusce tincidunt facilisis. Eget suscipit eget inceptos turpis orci ultrices. Dis mus sit bibendum eget parturient aenean suspendisse hendrerit. Cursus morbi eleifend nibh ipsum volutpat gravida facilisis. Cras varius maecenas egestas id natoque inceptos. Suscipit non non lobortis interdum eleifend iaculis felis nam posuere. Velit lacinia molestie vehicula dignissim lacus efficitur vel malesuada.	uploads/images/1730303041169-813998952.jpg	https://sergey_vasnev.artstation.com/projects/xYPwqE
6	t	Sulfuric Lands	An imaginative piece showcasing a rugged, sulfuric terrain.	uploads/images/1730302960508-769243761.jpg	https://sergey_vasnev.artstation.com/projects/8eqZZ6
5	t	Desert Station	A digital illustration depicting a mysterious desert military base landscape.	uploads/images/1730303018403-875795516.jpg	https://sergey_vasnev.artstation.com/projects/klvAWz
13	t	In the cave	Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra imperdiet consectetur; feugiat fusce tincidunt facilisis. Eget suscipit eget inceptos turpis orci ultrices. Dis mus sit bibendum eget parturient aenean suspendisse hendrerit. Cursus morbi eleifend nibh ipsum volutpat gravida facilisis. Cras varius maecenas egestas id natoque inceptos. Suscipit non non lobortis interdum eleifend iaculis felis nam posuere. Velit lacinia molestie vehicula dignissim lacus efficitur vel malesuada.	uploads/images/1730302939420-216931337.jpg	https://sergey_vasnev.artstation.com/projects/Ry9Q2D
3	t	Winter Walk	Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra imperdiet consectetur; feugiat fusce tincidunt facilisis. Eget suscipit eget inceptos turpis orci ultrices. Dis mus sit bibendum eget parturient aenean suspendisse hendrerit. Cursus morbi eleifend nibh ipsum volutpat gravida facilisis. Cras varius maecenas egestas id natoque inceptos. Suscipit non non lobortis interdum eleifend iaculis felis nam posuere. Velit lacinia molestie vehicula dignissim lacus efficitur vel malesuada.	uploads/images/1730303003527-534905417.jpg	https://sergey_vasnev.artstation.com/projects/0laQdV
9	t	Abandoned Ship	Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra imperdiet consectetur; feugiat fusce tincidunt facilisis. Eget suscipit eget inceptos turpis orci ultrices. Dis mus sit bibendum eget parturient aenean suspendisse hendrerit. Cursus morbi eleifend nibh ipsum volutpat gravida facilisis. Cras varius maecenas egestas id natoque inceptos. Suscipit non non lobortis interdum eleifend iaculis felis nam posuere. Velit lacinia molestie vehicula dignissim lacus efficitur vel malesuada.	uploads/images/1730302977194-292111175.jpg	https://sergey_vasnev.artstation.com/projects/EG2Zv
8	f	Hunters	Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra imperdiet consectetur; feugiat fusce tincidunt facilisis. Eget suscipit eget inceptos turpis orci ultrices. Dis mus sit bibendum eget parturient aenean suspendisse hendrerit. Cursus morbi eleifend nibh ipsum volutpat gravida facilisis. Cras varius maecenas egestas id natoque inceptos. Suscipit non non lobortis interdum eleifend iaculis felis nam posuere. Velit lacinia molestie vehicula dignissim lacus efficitur vel malesuada.	uploads/images/1730302996107-121625849.jpg	https://sergey_vasnev.artstation.com/projects/wJYZ26
2	t	Sleeping Beauty	Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra imperdiet consectetur; feugiat fusce tincidunt facilisis. Eget suscipit eget inceptos turpis orci ultrices. Dis mus sit bibendum eget parturient aenean suspendisse hendrerit. Cursus morbi eleifend nibh ipsum volutpat gravida facilisis. Cras varius maecenas egestas id natoque inceptos. Suscipit non non lobortis interdum eleifend iaculis felis nam posuere. Velit lacinia molestie vehicula dignissim lacus efficitur vel malesuada.	uploads/images/1730302928293-180388098.jpg	https://sergey_vasnev.artstation.com/projects/aoAmGz
10	f	Castle in rocks	A mysterious castle set against a misty backdrop, evoking fantasy themes.	uploads/images/1730305702110-142793049.jpg	https://sergey_vasnev.artstation.com/projects/zwKW6
30	t	Catacombs	Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra imperdiet consectetur; feugiat fusce tincidunt facilisis. Eget suscipit eget inceptos turpis orci ultrices. Dis mus sit bibendum eget parturient aenean suspendisse hendrerit. Cursus morbi eleifend nibh ipsum volutpat gravida facilisis. Cras varius maecenas egestas id natoque inceptos. Suscipit non non lobortis interdum eleifend iaculis felis nam posuere. Velit lacinia molestie vehicula dignissim lacus efficitur vel malesuada. Class congue non dictum non dictumst tortor donec?	uploads/images/1730307396648-521051467.jpg	https://sergey_vasnev.artstation.com/projects/18vZGK
31	t	Tram	Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra imperdiet consectetur; feugiat fusce tincidunt facilisis. Eget suscipit eget inceptos turpis orci ultrices. Dis mus sit bibendum eget parturient aenean suspendisse hendrerit. Cursus morbi eleifend nibh ipsum volutpat gravida facilisis. Cras varius maecenas egestas id natoque inceptos. Suscipit non non lobortis interdum eleifend iaculis felis nam posuere. Velit lacinia molestie vehicula dignissim lacus efficitur vel malesuada. Class congue non dictum non dictumst tortor donec?	uploads/images/1730307466970-937363057.jpg	https://sergey_vasnev.artstation.com/projects/v2qyyY
\.


--
-- Name: works_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.works_id_seq', 31, true);


--
-- Name: works works_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.works
    ADD CONSTRAINT works_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

