import Link from "next/link";
import { creditData } from "@/config/static/memberCreditData";
import { LinkedInIcon } from "@/final_refactor_src/components/icon";
import { EmailIcon } from "@/final_refactor_src/components/icon";
import { GitIcon } from "@/final_refactor_src/components/icon";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";

export default function CreditPage() {
  return (
    <section
      className={`rounded-lg w-full 
    bg-gradient-to-b from-gray-100 to-gray-200 
    pt-10 pb-5 px-4 sm:px-6 lg:px-8
    ${sejongHospitalLight.className}`}
    >
      <div className="flex flex-col items-center text-center">
        <h1
          className={`${sejongHospitalBold.className} text-3xl
          text-gray-900 sm:text-4xl`}
        >
          Credits
        </h1>
        <p className="mt-3 mx-auto text-gray-800 sm:text-xl md:mt-5">
          <span className={`${sejongHospitalBold.className}`}>
            umichkisa.com
          </span>{" "}
          was developed using{" "}
          <span className={`${sejongHospitalBold.className}`}>Next.js</span> +{" "}
          <span className={`${sejongHospitalBold.className}`}>
            Python Flask
          </span>
          .
        </p>
      </div>

      <h2
        className={`${sejongHospitalBold.className} text-xl sm:text-2xl
        text-gray-900`}
      >
        Contributors:
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {creditData.map((person, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300
            px-4 py-5 sm:p-6 flex flex-col gap-2 justify-between"
          >
            <div className="flex flex-col gap-1">
              <h3
                className={`${sejongHospitalBold.className} text-lg
                text-gray-900`}
              >
                {person.name}
              </h3>
              <p className=" text-gray-600">{person.email}</p>
              <p
                className={` font-medium text-michigan-light-blue ${sejongHospitalBold.className}`}
              >
                {person.role}
              </p>
              <p className="text-gray-700 mt-1 mb-2">{person.description}</p>
            </div>

            <div className="bottom-0 flex items-center space-x-4">
              {person.github && (
                <Link
                  href={person.github}
                  className="text-gray-600 hover:text-purple-700 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitIcon />
                </Link>
              )}
              {person.linkedin && (
                <Link
                  href={person.linkedin}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </Link>
              )}

              <Link
                href={`mailto:${person.email}`}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <EmailIcon />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
