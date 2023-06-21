import { graphQLRequest } from "./request";

export const folderLoader = async () => {
  const query = `query Folder {
      folders {
        id
        name
        notes{
          id
          content 
          updatedAt
        }

      }
    }
    `;
  const data = await graphQLRequest({ query });

  return data;
};

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: { name: newFolder.name },
  });

  return data;
};

export const removeFolder = async ({ params: { id } }) => {
  const query = `mutation RemoveFolder($removeFolderId: String!) {
    removeFolder(id: $removeFolderId) {
      id
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: { removeFolderId: id },
  });

  return data;
};
