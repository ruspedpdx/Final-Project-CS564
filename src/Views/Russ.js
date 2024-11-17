import React from 'react';
import { backgroundColors } from '../Uitls/chartColors';
import useFetchData from '../Hooks/GetAPI'; // Import the custom hook
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const Russ = ({ title }) => {
  const url = undefined;


  return (
    <section className="container">
      <h1>{title}</h1>
    </section>
  );
};

const styles = {
  chartContainer: {
    maxWidth: '80%',
    width: '100%',
    height: '100%',
    margin: '20px auto',
  },
};
export default Russ;