import * as React from "react"
import Svg, { Defs, Pattern, Image, G, Rect } from "react-native-svg"

function ProfilePic(props) {
  return (
    <Svg
      data-name="Thumbnail Circle"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={89}
      height={89}
      viewBox="0 0 89 89"
      {...props}
    >
      <Defs>
        <Pattern
          id="a"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          viewBox="0 0 223 226"
        >
          <Image
            width={223}
            height={226}
            xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4SDhAPDw8QEQ4NEhYSEA8NDhIPEBAQFhEWFhUTFBUYHSggGRolGxUWITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOIA3wMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQQFAwYCB//EADEQAQACAAQEBAUDBAMAAAAAAAABAgMEETEFIUFhEjJRcUJSgZGhscHRIjOSohNigv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9EAAAAAAAAAAAAAAAAAAAAAAAAAARKUSCQAAAAAAAAAAAAAAAAAAAAAAAAAESlEgkAAAAAAAAHbLZa155co62nYHBYwcpiW2rpHrblDUy+TpTprPrKwDNpwv5rfSI/d1jhmH63++i6AoW4XXpa0e/NXxOG3jyzFvxLXAedvSYnS0TE90PQ3pExpMRMd2dmuHdcP8Axn9gZ4TH3AAAAAAAESlEgkAAAAAAE0rMzERvM6AsZLKzedZ8kb9+0NmtYiNI5RG0PnBw4rWKx0fYAAAAAAAAKmdycXjWOV4/PaWPMdJ3jd6Nl8VwdJi8deU+4KAAAAAACJSiQSAAAAAAt8Lpria/LGv1VGjwevnn2gGkAAAAAAAAAA4Z3D8WHaO2se8O6LRyn2B5xJMdPQAAAAARKUSCQAAAAAGnwja3uzGlweeV/oDRAAAAAAAAAAJETsDz19595QWnnPuAAAAAIlKJBIAAAAADR4Nvf6fuz61mZiI3nk2srlYpHrad5BYAAAAAAAAAARbafaf0STHT1B5uErefykU0mvlnpPSVQAAAABEpRIJAAAAAB1yf92nu3nnInSYn05vQYOLFqxaOv6g+wAAAAAAAAAAAUuLf2/8A1DJXuK4utorHw8595UQAAAAESlEgkAAAAAB3yubtSfWs7x/DgA9Bg4sWrFq7T+H2xuHZjw20ny2/E9JbIAAAAAAAAChnc/4da0526z0h3zuP4Ka/FPKP5YgEzrzneQAAAAAESlEgkAAAAAAAENnh+Z8VdJ81d+8erHfWHiTWYtXeAehHxg4nirFvWH2AAAAAi06RrO0JZnFcedf+ONtNbdwVc5j+O+vSOVY7OIAAAAAAAIlKJBIAAAAAAAAERM8ojWewNbhV9cPT5Z/C6o8LwrVi3iiY1001XgAAAAGBmb63tPf8N+Xn8XBvXzVmO/T7g+BCQAAAAAAESlEgkAAEAkdcHLXt5a8vWeUL2Dwyvxzr2jlAMysTPKI1n0hawuH4k7x4Y/7b/ZrYeFWvKsRHtD7BSwuG0jzTNvxC3h4da8qxEe0PoAAAAAAAABXxcnh23rpPrXkqYvDJ+C2va3Kfu0wGBi4F6+asx36OT0itjZHDt00n1ry/AMUXMbh148v9UfaVO0TE6TExPpIAACJSiQSER06y0spw/wCLE3+X+QU8vlb32jl807NLL5Cld/6p77fZbiAAAAAAAAAAAAAAAAAAAB8YuDW3K0RP6vsBl5jhsxzpOsfLO/0UJiYnSY0mOkvRuOYy1bxzjn0mN4BhIl3zOWtSefOJ2tG0uEg18hlPDHit55/1j+V0AAAAAAAAAAAAAAAAAAAAAAAAAfOJSLRMTGsSxM5l5pbTpO09m64Z3L+OmnXXWAWAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k="
          />
        </Pattern>
      </Defs>
      <G stroke="#eee" strokeWidth={1} fill="url(#a)">
        <Rect width={89} height={89} rx={44.5} stroke="none" />
        <Rect x={0.5} y={0.5} width={88} height={88} rx={44} fill="none" />
      </G>
    </Svg>
  )
}

export default ProfilePic
