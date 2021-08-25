create database auth;

create table auth.users {
    id serial primary key,
    name text not null,
    email text not null,
    password text not null,
    created_at timestamp default now(),
    updated_at timestamp default now()
};

insert into auth.users (id, name, email, password) values (1, 'Matheus', 'matheus@email.com', '123456');
