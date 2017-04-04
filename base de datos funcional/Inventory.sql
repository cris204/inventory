--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE inventory (
    user_id integer NOT NULL,
    item_id integer NOT NULL,
    amount integer NOT NULL
);


ALTER TABLE inventory OWNER TO postgres;

--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE items (
    name text,
    type text NOT NULL,
    id integer NOT NULL,
    cost integer NOT NULL
);


ALTER TABLE items OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    id integer NOT NULL,
    gold integer,
    "Name" text NOT NULL
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO inventory VALUES (11, 1, 0);
INSERT INTO inventory VALUES (10, 2, 0);
INSERT INTO inventory VALUES (11, 2, 0);
INSERT INTO inventory VALUES (10, 1, 0);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO items VALUES ('gun', 'gun', 2, 80);
INSERT INTO items VALUES ('trinity', 'sword', 1, 100000);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "user" VALUES (10, 10000, 'cristian');
INSERT INTO "user" VALUES (11, 10000, 'hoyos');


--
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (user_id, item_id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: index_User_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "index_User_id" ON inventory USING btree (user_id);


--
-- Name: inventory lnk_items_inventory; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inventory
    ADD CONSTRAINT lnk_items_inventory FOREIGN KEY (item_id) REFERENCES items(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inventory lnk_user_inventory; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inventory
    ADD CONSTRAINT lnk_user_inventory FOREIGN KEY (user_id) REFERENCES "user"(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

