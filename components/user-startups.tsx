import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React, { FC } from "react";
import StartupCard, { StartupCardType } from "./startup-card";

interface IUserStartupsProps {
  id: string;
}

const UserStartups: FC<IUserStartupsProps> = async ({ id }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => <StartupCard key={startup._id} post={startup} />)
      ) : (
        <p className='no-result'>No Posts Yet</p>
      )}
    </>
  );
};

export default UserStartups;
