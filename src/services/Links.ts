// src/services/link.ts

export interface LinkPayload {
  title: string;
  url: string;
  description?: string;
  icon?: string;
  active?: boolean;
  startAt?: string | null;
  endAt?: string | null;
}

const BASE_URL = "/api/links";

/* ---------------- GET ALL LINKS ---------------- */

export async function getLinks() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
}

/* ---------------- CREATE LINK ---------------- */

export async function createLink(data: LinkPayload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

/* ---------------- UPDATE LINK ---------------- */

export async function updateLink(id: string, data: Partial<LinkPayload>) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

/* ---------------- DELETE LINK ---------------- */

export async function deleteLink(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
}
