# Defund12.org Image API

An api for generating images

## Docs

### /api/insta

Generate an instagram image

#### Options

| Param     | Required | Description                                                                                   |
| --------- | -------- | --------------------------------------------------------------------------------------------- |
| path      | yes      | Used for the website url path                                                                 |
| city      | yes      | Used for the city                                                                             |
| color     | no       | If not provided, it picks a random color. You can also specify a color from the below options |
| titleSize | no       | Specify if youd like the city text to have a different size                                   |
| urlSize   | no       | Specify if youd like the url to have a different size                                         |

#### Available colors

- `yellow`
- `magenta`
- `green`
- `blue`
- `turquoise`
- `orange`
- `purple`
- `pink`
- `red`


### /api/preview

Generate a meta preview image

#### Options

| Param     | Required | Description                                                                                   |
| --------- | -------- | --------------------------------------------------------------------------------------------- |
| state     | yes      | Used to fill in state in the image template                                                   |
| city      | yes      | Used to fill in city in the image template                                                    |
      
