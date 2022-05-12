export const saveProject = async ({ name, image }) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN}api/projects/create`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name, image }),
    }
  );

  if (!response.ok) {
    throw new Error('Saving error!');
  }
};

export const getAllProjects = async (token) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN}api/projects/all/?${new URLSearchParams({
      token,
    })}`
  );

  if (!response.ok) {
    throw new Error('Parsing error!');
  }

  const projects = response.json();
  return projects;
};

export const getProjectById = async ({ id, token }, res) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN}api/projects/?${new URLSearchParams({
      id,
      token,
    })}`
  );

  if (!response.ok) {
    res.redirect('/notfound');
  }

  const project = response.json();
  return project;
};
