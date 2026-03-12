import React from 'react';

interface ExportButtonsProps {
  data: any[];
  filename: string;
  type?: 'pdf' | 'excel' | 'both';
}

export default function ExportButtons({ data, filename, type = 'both' }: ExportButtonsProps) {
  
  const exportToPDF = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${filename}_${new Date().getTime()}.pdf`;
    link.click();
  };

  const exportToExcel = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${filename}_${new Date().getTime()}.xlsx`;
    link.click();
  };

  if (type === 'pdf') {
    return (
      <button className="btn btn-success btn-sm" onClick={exportToPDF}>
        <i className="fa fa-file-pdf me-1"></i>
        PDF
      </button>
    );
  }

  if (type === 'excel') {
    return (
      <button className="btn btn-info btn-sm" onClick={exportToExcel}>
        <i className="fa fa-file-excel me-1"></i>
        Excel
      </button>
    );
  }

  return (
    <div className="btn-group btn-group-sm">
      <button className="btn btn-success" onClick={exportToPDF}>
        <i className="fa fa-file-pdf me-1"></i>
        PDF
      </button>
      <button className="btn btn-info" onClick={exportToExcel}>
        <i className="fa fa-file-excel me-1"></i>
        Excel
      </button>
    </div>
  );
}