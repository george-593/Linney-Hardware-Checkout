CREATE TABLE public.inventory (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    description varchar(255),
    quantity int
);

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username varchar(255),
    isAdmin boolean,
    password varchar(255)
);