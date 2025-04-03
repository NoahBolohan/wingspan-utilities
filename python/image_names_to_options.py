import os

directory = os.fsencode(
    os.path.join(
        os.path.dirname(__file__),
        "../static/backgrounds"
    )
)

habitats = {
    "forest",
    "grassland",
    "wetland"
}
    

with open("options.html", 'w+') as f:
    f.write(
            f'<option value="random">Random</option>\n'
        )
    
    for file in os.listdir(directory):
        filename = os.fsdecode(file)

        str_split = filename.rstrip(".jpg").split('_')

        habitat = next(
            iter(
                set.intersection(
                    habitats,
                    set(str_split)
                )
            )
        )

        names = [
            s.capitalize() for s in str_split[:str_split.index(habitat)]
        ]

        displayed_name = f"{' '.join(names)} ({habitat.capitalize()})"

        f.write(
            f'<option value="{filename.rstrip(".jpg")}">{displayed_name}</option>\n'
        )