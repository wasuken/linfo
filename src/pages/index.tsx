import Head from "next/head";
import { useState, useEffect } from "react";
import { Line, Box } from "@/components/Styles";
import { Button, Container } from "react-bootstrap";

interface WebServiceStatus {
  id: string;
  web_service_id: string;
  status: boolean;
}

interface WebService {
  id: string | null;
  description: string;
  name: string;
  url: string;
  statusList: WebServiceStatus[];
}

export default function Home() {
  const [webServices, setWebServices] = useState<WebService[]>([]);
  function fetchWebService() {
    fetch(`/api/websrvs`)
      .then((res) => res.json())
      .then((js) => setWebServices(js));
  }
  function fetchUrlCheck(id: string) {
    fetch(`/api/watch/${id}`).then((res) => {
      if (res.status === 200) {
        console.log("success");
        fetchWebService();
      }
    });
  }
  useEffect(() => {
    fetchWebService();
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          {webServices.map((srv, i) => (
            <div key={i}>
              <Box>
                <p>
                  <a href={srv.url} target="_blank">
                    {srv.name}
                  </a>
                </p>
                <p>{srv.description}</p>
                <h4>
                  <Line>
                    <p>status</p>
                    <div>
                      {srv.statusList[0]?.status === true && (
                        <p style={{ color: "green" }}>green</p>
                      )}
                      {srv.statusList[0]?.status !== true && (
                        <p style={{ color: "red" }}>red</p>
                      )}
                    </div>
                    <p>
                      <Button onClick={() => fetchUrlCheck(srv.id)}>
                        Sync
                      </Button>
                    </p>
                  </Line>
                </h4>
              </Box>
            </div>
          ))}
        </Container>
      </main>
    </>
  );
}
