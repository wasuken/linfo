import Head from "next/head";
import { useState } from "react";
import { Box, Line } from "@/components/Styles";
import { Container, Button, Form } from "react-bootstrap";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  function postService() {
    const body = JSON.stringify({
      url,
      desc,
      name,
    });
    console.log(body);
    fetch(`/api/websrvs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        description: desc,
        name,
      }),
    }).then((res) => {
      if (res.status === 200) {
        console.log("success");
        setUrl("");
        setName("");
        setDesc("");
      }
    });
  }
  return (
    <Container>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Server Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Server Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="url">
        <Form.Label>Server URL</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter Server URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="desc">
        <Form.Label>Server Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter Server Description"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
      </Form.Group>
      <div>
        <Button onClick={() => postService()}>post</Button>
      </div>
    </Container>
  );
}
