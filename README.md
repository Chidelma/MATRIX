# MATRIX API Assessment

Bun and Tachyon-based assessment project that exposes matrix operations over HTTP and includes a small flight-search scoring helper.

## Goal

The main API surface is built around matrix processing endpoints such as:

- `echo`
- `invert`
- `flatten`
- `sum`
- `multiply`

The repo also includes a flight search utility in `lib/flight.ts`, which appears to be a separate exercise focused on filtering and ranking flights.

## Project Layout

- `routes/`: Tachyon route handlers.
- `lib/matrix.ts`: matrix parsing and operations.
- `lib/flight.ts`: flight ranking helper.
- `matrix.csv`: sample input data.
- `Matrix/`: Bruno collection for exercising the API.

## Requirements

- [Bun](https://bun.sh/)

## Setup

```bash
bun install
```

## Validation

```bash
bun --eval "await import('./lib/matrix.ts'); await import('./lib/flight.ts');"
```
