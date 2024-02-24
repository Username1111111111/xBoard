import getClient from "../getClient";
import getCollection from "../getCollection";


async function handler(req, res) {
    if (req.method === "POST") {
        const client = await getClient();
        const data = await req.json();

        console.log(`data: -----> ${data}`);

        try {

            const collection = await getCollection(client);

            const insertManyResult = await collection.insertMany(data);
            console.log(
                `${insertManyResult.insertedCount} documents successfully inserted.`
            );
            const res = new Response(data, {
                status: 201,
                statusText: "Board created successfully",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res
        } catch (error) {
            if (error.code === 11000) {
                // Duplicate key error code
                const res = new Response(error, {
                    status: 409,
                    statusText: "Board already exists",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return res;
            } else {
                const res = new Response(error, {
                    status: 500,
                    statusText: "Error creating board",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return res;
            }
        } finally {
            await client.close();
        }
    } else {
        const res = new Response(null, {
            status: 405,
            statusText: `Method ${req.method} Not Allowed`,
            headers: {
                "Content-Type": "application/json",
                "Allow": ["POST"]
            },
        });
        return res;
    }
}

export { handler as GET, handler as POST };