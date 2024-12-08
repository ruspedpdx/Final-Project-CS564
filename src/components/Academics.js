import React from "react";
import PropTypes from "prop-types";
import { Container, Card, ProgressBar } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getSchoolType,
  getProgramPercentagesAndNames,
} from "../utils/collegeData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Academics({ college, conversionRates, currencySymbol }) {
  let medianEarningsSchool =
    college["latest.earnings.10_yrs_after_entry.median"] || 0;
  let medianEarningsCategory =
    college[
      "latest.earnings.10_yrs_after_entry.consumer.median_by_pred_degree"
    ] || 0;

  if (conversionRates && !isNaN(conversionRates)) {
    medianEarningsSchool = Math.round(medianEarningsSchool * conversionRates);
    medianEarningsCategory = Math.round(
      medianEarningsCategory * conversionRates
    );
  }

  const maxEarnings = 100000 * conversionRates;

  const schoolProgress = Math.min(
    (medianEarningsSchool / maxEarnings) * 100,
    100
  );
  const categoryPosition = Math.min(
    (medianEarningsCategory / maxEarnings) * 100,
    100
  );

  const schoolType = getSchoolType(college["school.carnegie_size_setting"]);

  let midpoint = medianEarningsCategory;
  if (conversionRates && !isNaN(conversionRates)) {
    midpoint = Math.round(midpoint * conversionRates);
  }

  const programData = getProgramPercentagesAndNames(college);

  const chartData = {
    labels: programData.map((item) => item.name),
    datasets: [
      {
        label: "Program Percentage",
        data: programData.map((item) => item.percentage),
        backgroundColor: "rgba(0, 123, 255, 1)",
        borderRadius: 5,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw.toFixed(2)}%`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`, // Display percentage on X axis
        },
      },
    },
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Academics</h2>
      <Card className="shadow-lg mb-5">
        <Card.Body className="mx-1">
          <h4 className="text-start text-black font-weight-bold fs-2 mt-3 mb-0 pb-0">
            <strong>Median Earnings</strong>
          </h4>

          <p className="text-start text-primary fs-1 fw-bold my-0 py-0">
            {currencySymbol}
            {medianEarningsSchool.toLocaleString()}
          </p>

          <p className="text-start text-muted fs-5 mb-4 pb-4">
            Midpoint for {schoolType} Schools: {currencySymbol}
            {midpoint.toLocaleString()}
          </p>

          <div className="mt-4">
            <div className="d-flex justify-content-between mb-1">
              <span>{currencySymbol}0</span>
              <span>
                {currencySymbol}
                {maxEarnings.toLocaleString()}+
              </span>
            </div>
            <div className="progress-container mb-4">
              <ProgressBar className="bg-white" style={{ height: "30px" }}>
                <ProgressBar
                  now={schoolProgress}
                  variant="primary"
                  label={`${currencySymbol}${medianEarningsSchool.toLocaleString()}`}
                  key={1}
                />
                <div
                  className="position-absolute progress-marker"
                  style={{
                    left: `${categoryPosition}%`,
                  }}
                  title={`Median for Similar Schools: ${currencySymbol}${medianEarningsCategory.toLocaleString()}`}
                />
                <div
                  className="position-absolute progress-marker-label"
                  style={{
                    left: `${categoryPosition}%`,
                  }}
                >
                  {currencySymbol}
                  {medianEarningsCategory.toLocaleString()}
                </div>
              </ProgressBar>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card className="shadow-lg">
        <Card.Body>
          <h4 className="text-start text-black font-weight-bold fs-2 mb-3">
            Types of Degrees Awarded
          </h4>
          <Bar data={chartData} options={chartOptions} />
        </Card.Body>
      </Card>
    </Container>
  );
}

Academics.propTypes = {
  college: PropTypes.shape({
    "school.name": PropTypes.string.isRequired,
    "latest.earnings.10_yrs_after_entry.median": PropTypes.number,
    "latest.earnings.10_yrs_after_entry.consumer.median_by_pred_degree":
      PropTypes.number,
    "school.carnegie_size_setting": PropTypes.string.isRequired,
  }).isRequired,
  conversionRates: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
    .isRequired,
  currencySymbol: PropTypes.string.isRequired,
};

export default Academics;
