declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }

  declare module '*.png' {
    const value: any; // Или const value: string; если вы знаете, что это URL
    export default value;
  }
  
  declare module '*.jpg' {
    const value: any;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: any;
    export default value;
  }
  
