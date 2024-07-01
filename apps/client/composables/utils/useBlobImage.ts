const objectUrl = (blob: Blob): string | null => {
  if (!blob) return null;

  try {
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error creating object URL:", error);
    return null;
  }
};

export const useBlobImage = (
  request: () => Promise<Blob>,
  queryKey: string,
) => {
  const isLoading = ref(true);
  const url = useState<string>(queryKey);

  if (!url.value) {
    request().then((blob) => {
      url.value = objectUrl(blob!)!;
      isLoading.value = false;
    });
  }

  return { isLoading, url };
};
