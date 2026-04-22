declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: Record<string, any>;
    html2canvas?: Record<string, any>;
    jsPDF?: Record<string, any>;
  }

  interface Html2Pdf {
    set(options: Html2PdfOptions): Html2Pdf;
    from(element: HTMLElement | string): Html2Pdf;
    save(): void;
  }

  function html2pdf(): Html2Pdf;

  export default html2pdf;
}
