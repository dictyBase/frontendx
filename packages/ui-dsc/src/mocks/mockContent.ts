const sampleText =
  "To make taffy, the process usually begins by combining sugar, corn syrup, butter, and water in a large saucepan over medium heat. The mixture is stirred until the sugar dissolves completely, and then the heat is increased to bring it to a boil. Once boiling, a candy thermometer is used to monitor the temperature, usually aiming for around 250°F (121°C). At this stage, the saucepan is removed from the heat, and any desired flavorings and food coloring are added. The mixture is then poured onto a greased baking sheet or marble slab. As it cools slightly, the taffy is pulled and folded repeatedly to aerate and stretch it, resulting in a chewy and taffy-like consistency. Once the taffy has cooled enough to handle, it is often cut into small pieces and wrapped individually in wax paper to maintain its freshness. This process requires precision in temperature control and skilled pulling techniques to create the desired texture of the taffy."

const mockContent = {
  root: {
    children: [
      {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "font-size: 20px;",
                text: sampleText,
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "flex-layout",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
}

export { sampleText, mockContent }
