from pathlib import Path

html_source_dir = Path(__file__).parent.parent / "php/html"

php_output_dir = Path(__file__).parent.parent / "php"

for path in html_source_dir.iterdir():

    with open(
        path,
        'r'
    ) as f_html:
        
        with open(
           php_output_dir / path.with_suffix(".php").parts[-1],
            'w',
            newline=''
        ) as f_php:
            
            f_php.write("<?php\n")

            for line in f_html:

                line = line.rstrip('\n')
                f_php.write('    echo "' + line + '";\n')

            f_php.write("?>")
            
            print(php_output_dir / path.with_suffix(".php").parts[-1])