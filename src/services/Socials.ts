const BASE_URL = "/api/socials";

/* ---------------- GET ---------------- */

export async function getSocials() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  return res.json();
}

/* ---------------- CREATE ---------------- */

interface CreateSocialInput {
  platform: string;
  url: string;
}

export async function createSocial(data: CreateSocialInput) {
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

/* ---------------- UPDATE ---------------- */

interface UpdateSocialInput {
  platform: string;
  url: string;
}

export async function updateSocial(
  id: string,
  data: UpdateSocialInput
) {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...data,
    }),
  });

  return res.json();
}

/* ---------------- DELETE ---------------- */

export async function deleteSocial(id: string) {
  const res = await fetch(BASE_URL, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return res.json();
}