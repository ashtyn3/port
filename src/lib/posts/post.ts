export const getPost = async (id: string): Promise<string> => {
	const post = await import(`./${id}.md?raw`);
	return post.default;
};
