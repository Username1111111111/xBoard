import getClient from "../getClient";
import getCollection from "../getCollection";

async function handler(req, res) {
    if (req.method === "POST") {
        const client = await getClient();

        try {
            const collection = await getCollection(client);

            const boards = await collection.find({}).toArray();

            boards.forEach((board) => {
                board._id = board._id.toString();
                board.id = board.id.toString();
                board.name = board.name.toString();
                // console.log(board.id);
            });

            const resBody = JSON.stringify(boards);

            const res = new Response(resBody, {
                status: 200,
                statusText: "Boards have fetched",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res;
        } finally {
            await client.close();
        }
    }
}

export { handler as POST };
