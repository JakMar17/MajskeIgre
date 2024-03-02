export function createSeoFunction({title, description, imageUrl}: SeoModel) {
    return useServerSeoMeta({
        title,
        ogTitle: title,
        twitterTitle: title,
        description,
        ogDescription: description,
        imageUrl,
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