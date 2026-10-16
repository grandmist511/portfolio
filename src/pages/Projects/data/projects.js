/**
 * Project data — static, no backend required
 */

import careconnectImage from "../../../assets/images/careconnect.png";
import reconImage from "../../../assets/images/recon.png";

const projects = [
  {
    id: "CareConnect",
    title: "CareConnect",
    description:
      "A web application where babysitters meet parents and auditing for a spot online.",
    image: careconnectImage,
    tags: ["React", "javascript", "postgreSQL"],
    liveUrl: "https://careconnect-hazel.vercel.app/",
    githubUrl: "https://github.com/grandmist511/Careconnect",
  },
  {
    id: "Recon",
    title: "Recon",
    description:
      "A web application designed for entry level accountants to perform reconciliation with the help of AI .",
    image: reconImage,
    tags: ["React", "typescript", "PostgreSQL"],
    githubUrl: "https://github.com/grandmist511/Recon",
  },
];

export default projects;
