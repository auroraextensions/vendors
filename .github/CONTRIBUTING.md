# Contributing

## Table of Contents

- [Guidelines](#guidelines)
- [Files](#files)
- [Formatting](#formatting)
  + [Notes](#notes)
- [Pull Request Process](#pull-request-process)

## Guidelines

When contributing to this repository, please ensure the following:

1. A significant portion of your business is building and selling Magento extensions.
2. You have operated as a Magento extension vendor for at least one (1) year.
3. You have at least one (1) extension listed on the Magento Marketplace.

## Files

New entries should be included in the following files:

- [README.md](https://github.com/auroraextensions/vendors/blob/master/README.md)
- [vendors.json](https://github.com/auroraextensions/vendors/blob/master/data/vendors.json)

## Formatting

In README, new entries should utilize the following format:

```html
<tr>
  <td>Acme</td>
  <td>
    <div>
      <code>Acme</code>
    </div>
    <!-- If applicable, include ancillary namespaces associated with the vendor. -->
    <div>
      <code>AcmeWorks</code>
    </div>
  </td>
  <td>
    <a href="https://example.com/contact">https://example.com/contact</a>
  </td>
  <td>&ndash;</td>
</tr>
```

In vendors.json, new entries should utilize the following format:

```json
{
  "vendor": "Acme",
  "namespaces": [
    "Acme",
    "AcmeWorks"
  ],
  "support": "https://example.com/contact",
  "extdn": false
}
```

#### Notes

1. At least one (1) namespace is required, but listing all associated namespaces helps
   make this list more complete, so please list all associated namespaces for the vendor.

_README ONLY_:

1. For support link, you may also list an email address, if preferred. However, please
   make sure to set the email address as a hyperlink via `mailto:`. This does not apply to
   vendors.json, which only requires the email address and prepends `mailto:` automatically.
2. For ExtDN affiliation, please use `&#10004;` to signify affiliation, or `&ndash;` otherwise.
   This does not apply to vendors.json, which only requires `true` or `false`.

## Pull Request Process

1. All entries are listed alphabetically. Please ensure your pull request follows
   this format.
2. Ensure you use the format outlined in the [Formatting](#formatting) section. Any
   missing or inaccurate information will be rejected until rectified.
