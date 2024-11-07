import React from "react";
import SearchForm from "../../components/search-form";
import StartupCard from "@/components/startup-card";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

interface IHomeProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: IHomeProps) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);

  console.log(JSON.stringify(posts, null, 2));

  return (
    <>
      <section className='pink_container'>
        <h1 className='heading'>
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className='sub-heading !max-w-3xl'>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <></>
          )}
        </ul>
      </section>
    </>
  );
}
