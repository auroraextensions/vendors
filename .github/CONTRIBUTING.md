# Contributing

## Table of Contents

- [Guidelines](#guidelines)
- [Formatting](#formatting)
  + [Notes](#notes)
- [Pull Request Process](#pull-request-process)

## Guidelines

When contributing to this repository, please ensure the following:

1. A significant portion of your business is building and selling Magento extensions.
2. You have operated as a Magento extension vendor for at least one (1) year.
3. You have at least one (1) extension listed on the Magento Marketplace.

## Formatting

New entries should utilize the following format:

```
<tr>
  <td>[COMPANY NAME]</td>
  <td>
    <div>
      <code>[PRIMARY NAMESPACE]</code>
    </div>
    <!-- If applicable, include ancillary namespaces associated with the vendor. -->
    <div>
      <code>[LEGACY NAMESPACE]</code>
    </div>
  </td>
  <td>
    <a href="[SUPPORT LINK]">[SUPPORT LINK]</a>
  </td>
  <td>[EXTDN STATUS]</td>
</tr>
```

#### Notes

1. At least one (1) namespace is required, but listing all associated namespaces helps
   make this list more complete, so please list all associated namespaces for the vendor.
2. For support link, you may also list an email address, if preferred. However, please
   make sure to set the email address as a hyperlink via `mailto:`.
3. For ExtDN affiliation, please use `&#10004;` to signify affiliation, or `&ndash;` otherwise.

## Pull Request Process

1. All entries are listed alphabetically. Please ensure your pull request follows
   this format.
2. Ensure you use the format outlined in the [Formatting](#formatting) section. Any
   missing or inaccurate information will be rejected until rectified.
