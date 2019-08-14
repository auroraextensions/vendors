# Contributing

## Table of Contents

- [Guidelines](#guidelines)
- [Files](#files)
  + [Notes](#notes)
- [Pull Request Process](#pull-request-process)

## Guidelines

When contributing to this repository, please ensure the following:

1. A significant portion of your business is building and selling Magento extensions.
2. You have operated as a Magento extension vendor for at least one (1) year.
3. You have at least one (1) extension listed on the Magento Marketplace.

## Files

New entries should be included in `vendors.json` and utilize the following format:

```json
{
  "vendor": "Acme",
  "namespaces": [
    "Acme",
    "AcmeWorks"
  ],
  "support": "https://example.com/contact",
  "partnerships": [
    "select_extension_builder"
  ],
  "extdn": false
}
```

#### Notes

1. At least one (1) namespace is required, but listing all associated namespaces helps
   make this list more complete, so please list all associated namespaces for the vendor.
2. If you are a Magento partner, please list all partnerships. Below is the list of valid
   partnership values to include in the `partnerships` array:
    - `business_solution_partner`
    - `community_insider`
    - `contributor_solution_partner`
    - `enterprise_solution_partner`
    - `global_elite_solution_partner`
    - `magento_technology_partner`
    - `premier_extension_builder`
    - `premier_technology_partner`
    - `professional_solution_partner`
    - `select_extension_builder`
    - `select_technology_partner`

## Pull Request Process

1. All entries are listed alphabetically. Please ensure your pull request follows
   this format.
2. Ensure you use the format outlined in the [Formatting](#formatting) section. Any
   missing or inaccurate information will be rejected until rectified.
