import { useState, useEffect } from "react";
import { Line, Box, EditBtnArea } from "@/components/Styles";
import { Button, Container } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { parseISO, format } from "date-fns";

interface WebServiceStatus {
  id: string;
  web_service_id: string;
  status: boolean;
  createdAt: string;
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
  function fetchUrlCheck(id: string | null) {
    if (!id) return;
    fetch(`/api/watch/${id}`).then((res) => {
      if (res.status === 200) {
        console.log("success");
        fetchWebService();
      }
    });
  }
  function fetchAllSync() {
    fetch(`/api/sync`).then((res) => {
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
      <main>
        <Container>
          <Button onClick={() => fetchAllSync()}>All Sync</Button>
          {webServices.map((srv, i) => (
            <div key={i}>
              <Box>
                <h3>
                  <EditBtnArea href={`/edit/${srv?.id}`}>
                    <BiEdit />
                  </EditBtnArea>
                  <a href={srv.url} target="_blank">
                    {srv.name}
                  </a>
                </h3>
                <p>{srv.description}</p>
                <h4>
                  <Line>
                    <p>
                      <Button onClick={() => fetchUrlCheck(srv.id)}>
                        Sync
                      </Button>
                    </p>
                    <p>status</p>
                    <div>
                      {srv.statusList[0]?.status === true && (
                        <p style={{ color: "green" }}>green</p>
                      )}
                      {srv.statusList[0]?.status !== true && (
                        <p style={{ color: "red" }}>red</p>
                      )}
                    </div>
                  </Line>
                  <Line>
                    最終Sync:
                    {srv.statusList[0] &&
                      format(
                        new Date(srv.statusList[0].createdAt),
                        "yyyy-MM-dd hh:mm:ss"
                      )}
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
