import React, { FC } from "react";
import Ping from "./ping";
import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

interface IViewProps {
  id: string;
}

const View: FC<IViewProps> = async ({ id }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Ping />
      </div>

      <p className='view-text'>
        <span className='font-black'>
          {totalViews} {totalViews > 1 ? "Views" : "View"}
        </span>
      </p>
    </div>
  );
};

export default View;
