-- Create database

DROP SCHEMA IF EXISTS poketext;
CREATE SCHEMA poketext;
USE poketext;

-- Create tables

create table user
(
  username  varchar(50) null,
  password varchar(50) null,
  token varchar(50) null
);

create table pokemon
(
  name varchar(50) null,
  hp  int ,
  sprite BLOB
);

create table moves
(
  name varchar(50) null,
  accuracy int ,
  effect_chance int ,
  pp int ,
  priority int ,
  damage int
);

create table items
(
  name varchar(50) ,
  attributes varchar(50)
);
