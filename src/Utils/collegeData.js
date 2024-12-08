import React from "react";
import { FaCertificate, FaGraduationCap } from "react-icons/fa";
import {
  PiCertificateFill,
  PiNumberCircleTwoFill,
  PiNumberCircleFourFill,
} from "react-icons/pi";

const degreeIcons = {
  Certificate: <FaCertificate size={30} />,
  Associate: <PiNumberCircleTwoFill size={30} />,
  Bachelor: <PiNumberCircleFourFill size={30} />,
  Graduate: <FaGraduationCap size={30} />,
  Default: <PiCertificateFill size={30} />,
};

export function getSchoolType(type) {
  if (type === -2 || type === 0 || type === null) {
    return "N/A";
  }
  if (type >= 1 && type <= 5) {
    return "2-Year";
  }
  if (type >= 6 && type <= 17) {
    return "4-Year";
  }
  if (type === 18) {
    return "Graduate";
  }
  return "N/A";
}

export function getOwnershipType(ownership) {
  switch (ownership) {
    case 1:
      return "Public";
    case 2:
      return "Private Nonprofit";
    case 3:
      return "Private For-Profit";
    default:
      return "N/A";
  }
}

export function getDegreeType(degreeCode) {
  switch (degreeCode) {
    case 0:
      return {
        type: "N/A",
        description: "No degree information available",
        icon: degreeIcons.default,
      };
    case 1:
      return {
        type: "Certificate",
        description:
          "Most awards earned are certificates, but degrees may be offered.",
        icon: degreeIcons.Certificate,
      };
    case 2:
      return {
        type: "Associate",
        description:
          "Most awards earned are associate's degrees, but other degrees or certificates may be offered.",
        icon: degreeIcons.Associate,
      };
    case 3:
      return {
        type: "Bachelor",
        description:
          "Most awards earned are 4-year bachelor's degrees, but other degrees or certificates may be offered.",
        icon: degreeIcons.Bachelor,
      };
    case 4:
      return {
        type: "Graduate",
        description:
          "Most awards earned are graduate degrees, but other degrees or certificates may be offered.",
        icon: degreeIcons.Graduate,
      };
    default:
      return {
        type: "N/A",
        description: "No degree information available",
        icon: degreeIcons.Default,
      };
  }
}

export function getCampusLocale(locale) {
  switch (locale) {
    case 11:
      return {
        type: "City",
        description: "Large city with a population of 250,000 or more.",
      };
    case 12:
      return {
        type: "City",
        description:
          "Midsize city with a population of at least 100,000 but less than 250,000.",
      };
    case 13:
      return {
        type: "City",
        description: "Small city with a population less than 100,000.",
      };
    case 21:
      return {
        type: "Suburb",
        description:
          "Suburb of Large city (outside principal city, in urbanized area with population of 250,000 or more)",
      };
    case 22:
      return {
        type: "Suburb",
        description:
          "Suburb of Midsize city (outside principal city, in urbanized area with population of at least 100,000 but less than 250,000)",
      };
    case 23:
      return {
        type: "Suburb",
        description:
          "Suburb of Small city (outside principal city, in urbanized area with population less than 100,000)",
      };
    case 31:
      return {
        type: "Town",
        description:
          "Fringe town in urban cluster up to 10 miles from an urbanized area.",
      };
    case 32:
      return {
        type: "Town",
        description:
          "Distant town in urban cluster more than 10 miles and up to 35 miles from an urbanized area.",
      };
    case 33:
      return {
        type: "Town",
        description:
          "Remote town (in urban cluster more than 35 miles from an urbanized area).",
      };
    case 41:
      return {
        type: "Rural",
        description:
          "Fringe rural territory up to 5 miles from an urbanized area or up to 2.5 miles from an urban cluster.",
      };
    case 42:
      return {
        type: "Rural",
        description:
          "Distant rural territory more than 5 miles but up to 25 miles from an urbanized area or more than 2.5 and up to 10 miles from an urban cluster.",
      };
    case 43:
      return {
        type: "Rural",
        description:
          "Remote rural territory more than 25 miles from an urbanized area and more than 10 miles from an urban cluster.",
      };
    default:
      return { type: "N/A", description: "N/A" };
  }
}

export function getSchoolSize(sizeSetting) {
  switch (sizeSetting) {
    case -2:
      return { type: "N/A", description: "N/A", residency: "N/A" };
    case 0:
      return {
        type: "N/A",
        description: "Data not classified",
        residency: "N/A",
      };
    case 1:
      return {
        type: "Very Small",
        description: "Two-year institution with fewer than 500 students",
        residency: "N/A",
      };
    case 2:
      return {
        type: "Small",
        description: "Two-year institution with 500-1,999 students",
        residency: "N/A",
      };
    case 3:
      return {
        type: "Medium",
        description: "Two-year institution with 2,000-4,999 students",
        residency: "N/A",
      };
    case 4:
      return {
        type: "Large",
        description: "Two-year institution with 5,000-9,999 students",
        residency: "N/A",
      };
    case 5:
      return {
        type: "Very Large",
        description: "Two-year institution with 10,000+ students",
        residency: "N/A",
      };
    case 6:
      return {
        type: "Very Small",
        description:
          "Four-year institution, nonresidential with fewer than 1,000 students",
        residency: "is primarily a commuter campus.",
      };
    case 7:
      return {
        type: "Very Small",
        description:
          "Four-year institution, residential with fewer than 1,000 students",
        residency:
          "is a mainly a residential campus with a mix of commuter options.",
      };
    case 8:
      return {
        type: "Very Small",
        description:
          "Four-year institution, highly residential with fewer than 1,000 students",
        residency: "is primarily a residential campus.",
      };
    case 9:
      return {
        type: "Small",
        description:
          "Four-year institution, nonresidential with 1,000-2,999 students",
        residency: "is primarily a commuter campus.",
      };
    case 10:
      return {
        type: "Small",
        description:
          "Four-year institution, residential with 1,000-2,999 students",
        residency:
          "is a mainly a residential campus with a mix of commuter options.",
      };
    case 11:
      return {
        type: "Small",
        description:
          "Four-year institution, highly residential with 1,000-2,999 students",
        residency: "is primarily a residential campus.",
      };
    case 12:
      return {
        type: "Medium",
        description:
          "Four-year institution, nonresidential with 3,000-9,999 students",
        residency: "is primarily a commuter campus.",
      };
    case 13:
      return {
        type: "Medium",
        description:
          "Four-year institution, residential with 3,000-9,999 students",
        residency:
          "is a mainly a residential campus with a mix of commuter options.",
      };
    case 14:
      return {
        type: "Medium",
        description:
          "Four-year institution, highly residential with 3,000-9,999 students",
        residency: "is primarily a residential campus.",
      };
    case 15:
      return {
        type: "Large",
        description:
          "Four-year institution, nonresidential with 10,000+ students",
        residency: "is primarily a commuter campus.",
      };
    case 16:
      return {
        type: "Large",
        description: "Four-year institution, residential with 10,000+ students",
      };
    case 17:
      return {
        type: "Large",
        description:
          "Four-year institution, highly residential with 10,000+ students",
        residency: "is primarily a residential campus.",
      };
    case 18:
      return {
        type: "N/A",
        description: "Exclusively graduate/professional institution",
        residency: "N/A",
      };
    default:
      return {
        type: "N/A",
        description: "Data not classified",
        residency: "N/A",
      };
  }
}

export function getTotalCost(data) {
  const { inState, outOfState, academicYear, programYear } = data;

  if (academicYear === 0 && programYear === 0) {
    return {
      cost: "N/A",
      description: "Information not available",
    };
  }

  const totalCost = Math.max(academicYear, programYear);
  const adjustedCost =
    outOfState > inState ? totalCost - inState + outOfState : totalCost;

  return {
    cost: adjustedCost,
    description:
      "The average annual total cost of attendance, including tuition and fees, books and supplies, and living expenses for all full-time, first-time, degree/certificate-seeking, nonresident undergraduates.",
  };
}

export function getCompletionRate(data) {
  const { rate4yr, rateLess4yr } = data;

  if (rate4yr === null && rateLess4yr === null) {
    return {
      rate: "N/A",
      description: "Completion rate information is not available",
    };
  }

  const selectedRate = rate4yr !== null ? rate4yr : rateLess4yr;

  return {
    rate: selectedRate !== null ? Math.round(selectedRate * 100) : "N/A",
    description:
      "The percentage of students who completed their program within 150% of the normal time.",
  };
}

export function getAdmissionRate(data) {
  if (data === null || data === undefined || data === 0) {
    return 0;
  }
  return Math.round(data * 100);
}

export function getSpecialDesignations(data) {
  const specialDesignations = [];

  if (data["school.minority_serving.historically_black"] === 1)
    specialDesignations.push("Historically Black College and University");
  if (data["school.minority_serving.predominantly_black"] === 1)
    specialDesignations.push("Predominantly Black Institution");
  if (data["school.minority_serving.annh"] === 1)
    specialDesignations.push(
      "Alaska Native Native Hawaiian Serving Institution"
    );
  if (data["school.minority_serving.tribal"] === 1)
    specialDesignations.push("tribal College and University");
  if (data["school.minority_serving.aanipi"] === 1)
    specialDesignations.push(
      "Asian American Native American Pacific Islander-Serving Institution"
    );
  if (data["school.minority_serving.hispanic"] === 1)
    specialDesignations.push("Hispanic-Serving Institution");
  if (data["school.minority_serving.nant"] === 1)
    specialDesignations.push("Native American Non-Tribal Institution");

  let genderStatus;

  if (data["school.men_only"] === 1) {
    genderStatus = "Men-Only";
  } else if (data["school.women_only"] === 1) {
    genderStatus = "Women-Only";
  } else {
    genderStatus = "Coed";
  }

  const religiousAffiliations = {
    22: "American Evangelical Lutheran Church",
    24: "African Methodist Episcopal Zion Church",
    27: "Assemblies of God Church",
    28: "Brethren Church",
    30: "Roman Catholic",
    33: "Wisconsin Evangelical Lutheran Synod",
    34: "Christ and Missionary Alliance Church",
    35: "Christian Reformed Church",
    36: "Evangelical Congregational Church",
    37: "Evangelical Covenant Church of America",
    38: "Evangelical Free Church of America",
    39: "Evangelical Lutheran Church",
    40: "International United Pentecostal Church",
    41: "Free Will Baptist Church",
    42: "Interdenominational",
    43: "Mennonite Brethren Church",
    44: "Moravian Church",
    45: "North American Baptist",
    47: "Pentecostal Holiness Church",
    48: "Christian Churches and Churches of Christ",
    49: "Reformed Church in America",
    50: "Episcopal Church, Reformed",
    51: "African Methodist Episcopal",
    52: "American Baptist",
    53: "American Lutheran",
    54: "Baptist",
    55: "Christian Methodist Episcopal",
    57: "Church of God",
    58: "Church of Brethren",
    59: "Church of the Nazarene",
    60: "Cumberland Presbyterian",
    61: "Christian Church (Disciples of Christ)",
    64: "Free Methodist",
    65: "Friends",
    66: "Presbyterian Church (USA)",
    67: "Lutheran Church in America",
    68: "Lutheran Church - Missouri Synod",
    69: "Mennonite Church",
    71: "United Methodist",
    73: "Protestant Episcopal",
    74: "Churches of Christ",
    75: "Southern Baptist",
    76: "United Church of Christ",
    77: "Protestant, not specified",
    78: "Multiple Protestant Denomination",
    79: "Other Protestant",
    80: "Jewish",
    81: "Reformed Presbyterian Church",
    84: "United Brethren Church",
    87: "Missionary Church Inc",
    88: "Undenominational",
    89: "Wesleyan",
    91: "Greek Orthodox",
    92: "Russian Orthodox",
    93: "Unitarian Universalist",
    94: "Latter Day Saints (Mormon Church)",
    95: "Seventh Day Adventists",
    97: "The Presbyterian Church in America",
    99: "Other (none of the above)",
    100: "Original Free Will Baptist",
    101: "Ecumenical Christian",
    102: "Evangelical Christian",
    103: "Presbyterian",
    105: "General Baptist",
    106: "Muslim",
    107: "Plymouth Brethren",
  };

  const religiousAffiliation =
    religiousAffiliations[data["school.religious_affiliation"]] || "None";

  const hasDesignation =
    specialDesignations.length > 0 ||
    genderStatus !== "Coed" ||
    religiousAffiliation !== "None"
      ? 1
      : 0;

  return {
    hasDesignation,
    specialDesignations,
    genderStatus,
    religiousAffiliation,
  };
}

export function getScores(data) {
  const sat = {
    cr: {
      // Critical Reading
      p25: data[
        "latest.admissions.sat_scores.25th_percentile.critical_reading"
      ],
      p75: data[
        "latest.admissions.sat_scores.75th_percentile.critical_reading"
      ],
      midpoint: data["latest.admissions.sat_scores.midpoint.critical_reading"],
      p50: data[
        "latest.admissions.sat_scores.50th_percentile.critical_reading"
      ],
    },
    math: {
      p25: data["latest.admissions.sat_scores.25th_percentile.math"],
      p75: data["latest.admissions.sat_scores.75th_percentile.math"],
      midpoint: data["latest.admissions.sat_scores.midpoint.math"],
      p50: data["latest.admissions.sat_scores.50th_percentile.math"],
    },
    avg: data["latest.admissions.sat_scores.average.overall"],
  };

  const act = {
    cumulative: {
      p25: data["latest.admissions.act_scores.25th_percentile.cumulative"],
      p75: data["latest.admissions.act_scores.75th_percentile.cumulative"],
      midpoint: data["latest.admissions.act_scores.midpoint.cumulative"],
    },
  };

  return { sat, act };
}

export function getTestScoreRequirement(data) {
  const requirementCode = data["latest.admissions.test_requirements"];
  switch (requirementCode) {
    case 1:
      return "Test scores are required for admission.";
    case 2:
      return "Test scores are recommended but not mandatory.";
    case 3:
      return "Test scores are neither required nor recommended.";
    case 4:
      return "Test score requirement is unknown.";
    case 5:
      return "Test scores are considered but not required.";
    default:
      return "N/A";
  }
}

export function getCostOfAttendance(data) {
  return {
    onCampusRoomAndBoard: data["latest.cost.roomboard.oncampus"] || "N/A",
    onCampusOtherExpenses: data["latest.cost.otherexpense.oncampus"] || "N/A",
    offCampusRoomAndBoard: data["latest.cost.roomboard.offcampus"] || "N/A",
    offCampusOtherExpenses: data["latest.cost.otherexpense.offcampus"] || "N/A",
    withFamilyOtherExpenses:
      data["latest.cost.otherexpense.withfamily"] || "N/A",
    inStateTuition: data["latest.cost.tuition.in_state"] || "N/A",
    outOfStateTuition: data["latest.cost.tuition.out_of_state"] || "N/A",
    bookAndSupplies: data["latest.cost.booksupply"] || "N/A",
  };
}

export function getEnrollmentData(data) {
  const rawPartTimeShare = data["latest.student.part_time_share"] || null;
  const partTimeShare =
    rawPartTimeShare !== null ? Number(rawPartTimeShare.toFixed(2)) : null;
  const fullTimeShare =
    partTimeShare !== null ? Number((1 - partTimeShare).toFixed(2)) : null;

  return {
    gradStudents: data["latest.student.grad_students"] || null,
    totalSize: data["latest.student.size"] || null,
    partTimeShare,
    fullTimeShare,
  };
}

export const getStudentAndFacultyDemographics = (college) => {
  const studentDemographics = {
    white: Math.round(
      (college["latest.student.demographics.race_ethnicity.white"] || 0) * 100
    ),
    black: Math.round(
      (college["latest.student.demographics.race_ethnicity.black"] || 0) * 100
    ),
    hispanic: Math.round(
      (college["latest.student.demographics.race_ethnicity.hispanic"] || 0) *
        100
    ),
    asian: Math.round(
      (college["latest.student.demographics.race_ethnicity.asian"] || 0) * 100
    ),
    aian: Math.round(
      (college["latest.student.demographics.race_ethnicity.aian"] || 0) * 100
    ),
    nhpi: Math.round(
      (college["latest.student.demographics.race_ethnicity.nhpi"] || 0) * 100
    ),
    twoOrMore: Math.round(
      (college["latest.student.demographics.race_ethnicity.two_or_more"] || 0) *
        100
    ),
    nonResidentAlien: Math.round(
      (college[
        "latest.student.demographics.race_ethnicity.non_resident_alien"
      ] || 0) * 100
    ),
    unknown: Math.round(
      (college["latest.student.demographics.race_ethnicity.unknown"] || 0) * 100
    ),
  };

  const facultyDemographics = {
    white: Math.round(
      (college["latest.student.demographics.faculty.race_ethnicity.white"] ||
        0) * 100
    ),
    black: Math.round(
      (college["latest.student.demographics.faculty.race_ethnicity.black"] ||
        0) * 100
    ),
    hispanic: Math.round(
      (college["latest.student.demographics.faculty.race_ethnicity.hispanic"] ||
        0) * 100
    ),
    asian: Math.round(
      (college["latest.student.demographics.faculty.race_ethnicity.asian"] ||
        0) * 100
    ),
    aian: Math.round(
      (college["latest.student.demographics.faculty.race_ethnicity.aian"] ||
        0) * 100
    ),
    nhpi: Math.round(
      (college["latest.student.demographics.faculty.race_ethnicity.nhpi"] ||
        0) * 100
    ),
    twoOrMore: Math.round(
      (college[
        "latest.student.demographics.faculty.race_ethnicity.two_or_more"
      ] || 0) * 100
    ),
    nonResidentAlien: Math.round(
      (college[
        "latest.student.demographics.faculty.race_ethnicity.non_resident_alien"
      ] || 0) * 100
    ),
    unknown: Math.round(
      (college["latest.student.demographics.faculty.race_ethnicity.unknown"] ||
        0) * 100
    ),
  };

  return {
    studentDemographics,
    facultyDemographics,
  };
};

export function getProgramPercentagesAndNames(data) {
  const result = [];

  const programNameMap = {
    legal: "Legal",
    health: "Health",
    english: "English",
    history: "History",
    library: "Library Science",
    computer: "Computer Science",
    language: "Languages",
    military: "Military Studies",
    education: "Education",
    resources: "Natural Resources",
    biological: "Biological Sciences",
    humanities: "Humanities",
    psychology: "Psychology",
    agriculture: "Agriculture",
    engineering: "Engineering",
    mathematics: "Mathematics",
    architecture: "Architecture",
    construction: "Construction",
    communication: "Communications",
    social_science: "Social Sciences",
    transportation: "Transportation",
    multidiscipline: "Multidisciplinary Studies",
    physical_science: "Physical Sciences",
    personal_culinary: "Personal & Culinary Services",
    visual_performing: "Visual & Performing Arts",
    business_marketing: "Business & Marketing",
    science_technology: "Science & Technology",
    philosophy_religious: "Philosophy & Religious Studies",
    precision_production: "Precision Production",
    engineering_technology: "Engineering Technology",
    ethnic_cultural_gender: "Ethnic, Cultural, & Gender Studies",
    family_consumer_science: "Family & Consumer Sciences",
    parks_recreation_fitness: "Parks, Recreation, & Fitness",
    security_law_enforcement: "Security & Law Enforcement",
    communications_technology: "Communications Technology",
    mechanic_repair_technology: "Mechanic & Repair Technology",
    theology_religious_vocation: "Theology & Religious Vocations",
    public_administration_social_service:
      "Public Administration & Social Service",
  };

  for (const [program, readableName] of Object.entries(programNameMap)) {
    const percentage = data[`latest.academics.program_percentage.${program}`];

    if (percentage > 0) {
      const percentageValue = percentage * 100;

      result.push({ name: readableName, percentage: percentageValue });
    }
  }

  result.sort((a, b) => b.percentage - a.percentage);

  return result;
}
