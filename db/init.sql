CREATE TABLE public.inventory (
    id int PRIMARY KEY,
    name varchar(255),
    description varchar(255),
    quantity int
);

CREATE TABLE public.users (
    id int PRIMARY KEY,
    name varchar(255),
    email varchar(255),
    isAdmin boolean,
    password varchar(255)
);