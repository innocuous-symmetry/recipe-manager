function useDateFormat(input: string | undefined) {
    if (typeof input == 'undefined') return "unknown";

    const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: "long" });
    const output = dateFormatter.format(new Date(input));

    return output;
}

export default useDateFormat