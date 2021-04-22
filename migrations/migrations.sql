-- Create database

DROP SCHEMA IF EXISTS poketext;
CREATE SCHEMA poketext;
USE poketext;

-- Create tables

create table user
(
    userid int(11) not null auto_increment,
    username  varchar(50) null,
    password varchar(256) null,
    token varchar(256) null,
    wincount int default 0,
    losscount int default 0,
    primary key (userid)
);

create table pokemon
(
    pokemonid int(11) not null auto_increment,
    name varchar(50) null,
    hp  int ,
    sprite varchar(250) null,
    userid int not null,
    primary key (pokemonid),
    foreign key (userid) REFERENCES user(userid)
);

create table move
(
    moveid int(11) not null auto_increment,
    name varchar(50) null,
    accuracy int ,
    effect_chance int ,
    pp int ,
    priority int ,
    damage int,
    pokemonid int,
    primary key (moveid),
    foreign key (pokemonid) references pokemon(pokemonid) on delete cascade
);

create table item
(
    itemid int(11) not null auto_increment,
    name varchar(50) ,
    attributes varchar(50),
    sprite varchar(250) null,
    userid int not null,
    primary key (itemid),
    foreign key (userid) references user(userid)
);

# -- DUMMY DATA

insert into user (username, password, token) values ('bot', 'bot', 'bottoken');
