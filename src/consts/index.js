import { RiBarChartLine, RiAddCircleLine, RiListCheck } from 'react-icons/ri';
import { BiBarChartAlt2 } from "react-icons/bi";

export const navLinks = [
    { id: 1, url: '/', text: 'Statistics', icon: BiBarChartAlt2 },
    { id: 2, url: 'add-job', text: 'Add Job', icon: RiAddCircleLine },
    { id: 3, url: 'all-jobs', text: 'All Jobs', icon: RiListCheck }
];

export const jobTypes = ['full-time', 'part-time', 'internship'];
export const jobStatuses = ['applied', 'interview', 'offer', 'rejected'];

export const customChartTheme = {
    baseTheme: 'ag-default',
    palette: {
        fills: ['#C3B2E7', '#f682a5', '#c9da8f', '#fedf6f', '#f9a474'],
        strokes: ['#ffffff'],
    },
    overrides: {
        common: {
            title: {
                fontSize: 24,
            },
        },
        bar: {
            series: {
                label: {
                    enabled: true,
                    color: 'black',
                },
            },
        },
    },
}

export const statusStats = [
    {status: 'all', color: 'balance', icon: RiBarChartLine, text: 'applications' },
    {status: 'interview', color: 'joy', icon: RiBarChartLine, text: 'interviews' },
    {status: 'rejected', color: 'passion', icon: RiBarChartLine, text: 'rejections'},
    {status: 'offer', color: 'warmth', icon: RiBarChartLine, text: 'offers'}
]