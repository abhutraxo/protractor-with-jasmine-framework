export class RestWrapper {
  readonly unirest: any;
  request: any;

  constructor() {
    this.unirest = require('unirest');
  }

  /**
   * Request option container for details about the request.
   * @param arg
   * @return {Object}
   */
  options(arg: any): this {
    this.request.options(arg);
    return this;
  }

  /**
   * Adds headers
   * @param arg
   * @return {Object}
   */
  headers(arg: any): this {
    this.request.headers(arg);
    return this;
  }

  /**
   * Adds headers
   * @param arg
   * @return {Object}
   */
  ssl(arg: any): this {
    this.request.sslCert(arg);
    return this;
  }
  /**
   * Adds a header
   * @param {string} key
   * @param {string} value
   * @return {Object}
   */
  header(key: string, value: string): this {
    this.request.header(key, value);
    return this;
  }

  /**
   * Basic authentication setup
   * @param {string} Authentication Username
   * @param {string} Authentication Password
   * @param {boolean} Optional; Defaults to true; Flag to determine whether Request should send the basic authentication header
   * along with the request. Upon being false, Request will retry with a proper authentication header after receiving a
   * 401 response from the server (which must contain a WWW-Authenticate header indicating the required authentication method)
   * @return {Object}
   */
  auth(user: string,
       pass: string,
       sendImmediately = true): this {
    this.request.auth({ user, pass, sendImmediately });
    return this;
  }

  /**
   * Object should consist of name: 'path' otherwise use name and path.
   * name (String) - File field name
   * path (String | Object) - File value, A String will be parsed based on its value. If path contains http or https Request
   * will handle it as a remote file. If path does not contain http or https then uni rest will assume that it is the path
   * to a local file and attempt to find it using path.resolve. An Object is directly set, so you can do pre-processing
   * if you want without worrying about the string value.
   * @param arg
   * @return {Object}
   */
  attach(arg: any): this {
    this.request.attach(arg);
    return this;
  }

  /**
   * Attaches a field to the multipart-form request, with pre-processing.
   * @param name
   * @param value
   * @param options
   * @return {Object}
   */
  field(name: any, value: any, options: any): this {
    this.request.field(name, value, options);
    return this;
  }

  /**
   * Sets _stream flag to use request streaming instead of direct form-data usage. This seemingly appears to only work for node
   * servers, use streaming only if you are a hundred percent sure it will work. Tread carefully.
   * @return {Object}
   */
  stream(): this {
    this.request.stream();
    return this;
  }

  /**
   * Serialize value as querystring representation, and append or set on `Request.options.url`
   * @param  {String|Object} value
   * @return {Object}
   */
  query(arg: any): this {
    this.request.query(arg);
    return this;
  }

  /**
   * Set _content-type_ header with type passed through `mime.lookup()` when necessary.
   * @param arg
   * @returns {this}
   */
  type(arg: any): this {
    this.request.type(arg);
    return this;
  }

  /**
   * Data marshalling for HTTP request body data
   *
   * Determines whether type is `form` or `json`.
   * For irregular mime-types the `.type()` method is used to infer the `content-type` header.
   *
   * When mime-type is `application/x-www-form-urlencoded` data is appended rather than overwritten.
   *
   * @param  {Mixed} data
   * @return {Object}
   */
  send(arg: any): this {
    this.request.send(arg);
    return this;
  }

  /**
   * Takes multipart options and places them on `options.multipart` array.
   * Transforms body when an `Object` or _content-type_ is present.
   *
   * Example:
   *
   *      unirest.get('http://google.com').part({
     *        'content-type': 'application/json',
     *        body: {
     *          phrase: 'Hello'
     *        }
     *      }).part({
     *        'content-type': 'application/json',
     *        body: {
     *          phrase: 'World'
     *        }
     *      }).end(function (response) {})
   *
   * @param  {Object|String} options When an Object, headers should be placed directly on the object,
   *                                 not under a child property.
   * @return {Object}
   */
  part(arg: any): this {
    this.request.part(arg);
    return this;
  }

  /**
   * Creates POST request
   * @param {string} url
   * @returns {this}
   */
  post(url: string): this {
    this.request = this.unirest.post(url);
    return this;
  }

  /**
   * Creates PATCH request
   * @param {string} url
   * @returns {this}
   */
  patch(url: string): this {
    this.request = this.unirest.patch(url);
    return this;
  }

  /**
   * Creates PUT request
   * @param {string} url
   * @returns {this}
   */
  put(url: string): this {
    this.request = this.unirest.put(url);
    return this;
  }

  /**
   * Creates HEAD request
   * @param {string} url
   * @returns {this}
   */
  head(url: string): this {
    this.request = this.unirest.head(url);
    return this;
  }

  /**
   * Creates GET request
   * @param {string} url
   * @returns {this}
   */
  get(url: string): this {
    this.request = this.unirest.get(url);
    return this;
  }

  /**
   * Creates DELETE request
   * @param {string} url
   * @returns {this}
   */
  delete(url: string): this {
    this.request = this.unirest.delete(url);
    return this;
  }

  /**
   * Sends HTTP Request and awaits Response finalization. Request compression and Response decompression occurs here.
   * Upon HTTP Response post-processing occurs and invokes `callback` with a single argument, the `[Response](#response)` object.
   *
   * @param  {Function} callback
   * @return {Object}
   */
  end(): Promise<Response> {
    return new Promise<Response>((resolve) => {
      this.request
        .end((res: any) => {
          resolve(res);
        });
    });
  }
}
