export const buttons = (item, handleClose) => {
    return (
        <button
            className="h-full w-full text-center font-primary-solid text-lg md:text-3xl"
            onClick={(e) => {
                handleClose(e);
                scrollTo(item.name);
            }}
        >
            {item.name}
        </button>
    );
}
  
export const links = (item) => (
<a
    className="h-full w-full text-center font-primary-solid text-lg md:text-3xl"
    href={item.url}
>
    {item.name}
</a>
);

export const scrollTo = (id) => {
    const getMeTo = document.getElementById(id);
    getMeTo.scrollIntoView({behavior: 'smooth',block: 'center'}, true);
}