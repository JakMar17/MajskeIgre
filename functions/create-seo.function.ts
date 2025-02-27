export async function createSeoFunction({title, description, imageUrl}: SeoModel) {
    const parsedDescription = (await parseMarkdown(description)).description;
    return useServerSeoMeta({
        title,
        ogTitle: title,
        twitterTitle: title,
        description: parsedDescription,
        ogDescription: parsedDescription,
        image: imageUrl,
        ogImageUrl: imageUrl,
        twitterCard: "summary_large_image",
        author: "Jakob Marušič"
    })
}

export type SeoModel = {
    title: string;
    description: string;
    imageUrl?: string;
}