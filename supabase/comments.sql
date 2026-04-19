create extension if not exists pgcrypto;

create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  article_slug text not null,
  user_github_login text not null,
  user_avatar text,
  user_name text,
  content text not null,
  created_at timestamptz default now()
);

create index if not exists comments_article_slug_idx on comments(article_slug);

alter table comments enable row level security;

drop policy if exists "Anyone can read comments" on comments;
create policy "Anyone can read comments"
on comments
for select
using (true);

drop policy if exists "Authenticated users can insert comments" on comments;
create policy "Authenticated users can insert comments"
on comments
for insert
with check (auth.role() = 'authenticated');
