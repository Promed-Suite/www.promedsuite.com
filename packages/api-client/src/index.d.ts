export declare const createClient: (baseUrl?: string) => {
  index: import("hono/client").ClientRequest<{
    $get: {
      input: {};
      output: {
        message: string;
      };
      outputFormat: "json";
      status: 200;
    };
  }>;
} & {
  benefits: import("hono/client").ClientRequest<{
    $get: {
      input: {};
      output: {
        code: number;
        benefit: string;
        class: number;
        require_lou: number;
      }[];
      outputFormat: "json";
      status: 200;
    };
  } & {
    $post: {
      input: {
        json: unknown;
      };
      output: {
        code: number;
        benefit: string;
        class: number;
        require_lou: number;
      };
      outputFormat: "json";
      status: 201;
    } | {
      input: {
        json: unknown;
      };
      output: {
        success: boolean;
        error: {
          issues: {
            code: string;
            path: (string | number)[];
            message?: string | undefined;
          }[];
          name: string;
        };
      };
      outputFormat: "json";
      status: 422;
    };
  }>;
} & {
  benefits: {
    ":id": import("hono/client").ClientRequest<{
      $get: {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {
          success: boolean;
          error: {
            issues: {
              code: string;
              path: (string | number)[];
              message?: string | undefined;
            }[];
            name: string;
          };
        };
        outputFormat: "json";
        status: 422;
      } | {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {
          code: number;
          benefit: string;
          class: number;
          require_lou: number;
        };
        outputFormat: "json";
        status: 200;
      } | {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {
          message: string;
        };
        outputFormat: "json";
        status: 404;
      };
    } & {
      $patch: {
        input: {
          param: {
            id: unknown;
          };
        } & {
          json: any;
        };
        output: {
          success: boolean;
          error: {
            issues: {
              code: string;
              path: (string | number)[];
              message?: string | undefined;
            }[];
            name: string;
          };
        };
        outputFormat: "json";
        status: 422;
      } | {
        input: {
          param: {
            id: unknown;
          };
        } & {
          json: any;
        };
        output: {
          code: number;
          benefit: string;
          class: number;
          require_lou: number;
        };
        outputFormat: "json";
        status: 200;
      } | {
        input: {
          param: {
            id: unknown;
          };
        } & {
          json: any;
        };
        output: {
          message: string;
        };
        outputFormat: "json";
        status: 404;
      };
    } & {
      $delete: {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {
          success: boolean;
          error: {
            issues: {
              code: string;
              path: (string | number)[];
              message?: string | undefined;
            }[];
            name: string;
          };
        };
        outputFormat: "json";
        status: 422;
      } | {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {
          message: string;
        };
        outputFormat: "json";
        status: 404;
      } | {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {};
        outputFormat: string;
        status: 204;
      };
    }>;
  };
};
export declare const client: {
  index: import("hono/client").ClientRequest<{
    $get: {
      input: {};
      output: {
        message: string;
      };
      outputFormat: "json";
      status: 200;
    };
  }>;
} & {
  benefits: import("hono/client").ClientRequest<{
    $get: {
      input: {};
      output: {
        code: number;
        benefit: string;
        class: number;
        require_lou: number;
      }[];
      outputFormat: "json";
      status: 200;
    };
  } & {
    $post: {
      input: {
        json: unknown;
      };
      output: {
        code: number;
        benefit: string;
        class: number;
        require_lou: number;
      };
      outputFormat: "json";
      status: 201;
    } | {
      input: {
        json: unknown;
      };
      output: {
        success: boolean;
        error: {
          issues: {
            code: string;
            path: (string | number)[];
            message?: string | undefined;
          }[];
          name: string;
        };
      };
      outputFormat: "json";
      status: 422;
    };
  }>;
} & {
  benefits: {
    ":id": import("hono/client").ClientRequest<{
      $get: {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {
          success: boolean;
          error: {
            issues: {
              code: string;
              path: (string | number)[];
              message?: string | undefined;
            }[];
            name: string;
          };
        };
        outputFormat: "json";
        status: 422;
      } | {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {
          code: number;
          benefit: string;
          class: number;
          require_lou: number;
        };
        outputFormat: "json";
        status: 200;
      } | {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {
          message: string;
        };
        outputFormat: "json";
        status: 404;
      };
    } & {
      $patch: {
        input: {
          param: {
            id: unknown;
          };
        } & {
          json: any;
        };
        output: {
          success: boolean;
          error: {
            issues: {
              code: string;
              path: (string | number)[];
              message?: string | undefined;
            }[];
            name: string;
          };
        };
        outputFormat: "json";
        status: 422;
      } | {
        input: {
          param: {
            id: unknown;
          };
        } & {
          json: any;
        };
        output: {
          code: number;
          benefit: string;
          class: number;
          require_lou: number;
        };
        outputFormat: "json";
        status: 200;
      } | {
        input: {
          param: {
            id: unknown;
          };
        } & {
          json: any;
        };
        output: {
          message: string;
        };
        outputFormat: "json";
        status: 404;
      };
    } & {
      $delete: {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {
          success: boolean;
          error: {
            issues: {
              code: string;
              path: (string | number)[];
              message?: string | undefined;
            }[];
            name: string;
          };
        };
        outputFormat: "json";
        status: 422;
      } | {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {
          message: string;
        };
        outputFormat: "json";
        status: 404;
      } | {
        input: {
          param: {
            id: unknown;
          };
        };
        output: {};
        outputFormat: string;
        status: 204;
      };
    }>;
  };
};
// # sourceMappingURL=index.d.ts.map
