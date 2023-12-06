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

CREATE TABLE public.requests (
    id SERIAL PRIMARY KEY,
    user_id int,
    item_id int,
    quantity int,
    status varchar(255),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES inventory(id)
);