import re
import os

def hex_to_rgb(hex_code):
    return ','.join(
        map(
            str,
            tuple(
                int(
                    hex_code[0].lstrip('#')[i:i+2],
                    16
                ) for i in (0, 2, 4)
            )
        )
    )

with open(
    os.path.join(
        os.path.dirname(__file__),
        "../css/themes.css"
    ),
    'w'
) as new_f:
    with open(
        os.path.join(
            os.path.dirname(__file__),
            "../css/hex_themes.css"
        ),
        'r'
    ) as old_f:
        for line in old_f:
            line_new = re.sub(
                r"#[A-Za-z0-9]{6}",
                hex_to_rgb,
                line
            )
            new_f.write(line_new)
