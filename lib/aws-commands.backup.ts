// AWS CLI command structure
export interface CommandParameter {
  name: string;
  description?: string;
}

export interface Command {
  name: string;
  description?: string;
  parameters: CommandParameter[];
}

export interface Service {
  name: string;
  description?: string;
  commands: Command[];
}

// AWS CLI data structure
export const awsServices: Service[] = [
  {
    name: "ec2",
    description: "Amazon Elastic Compute Cloud",
    commands: [
      {
        name: "describe-instances",
        description: "Describes one or more of your instances",
        parameters: [
          { name: "--instance-ids <value>", description: "One or more instance IDs" },
          { name: "--dry-run | --no-dry-run", description: "Checks whether you have the required permissions" },
          { name: "--filters <value>", description: "One or more filters" },
          { name: "--cli-input-json | --cli-input-yaml", description: "Reads arguments from JSON or YAML file" },
          { name: "--starting-token <value>", description: "Token to specify where to start paginating" },
          { name: "--page-size <value>", description: "Size of each page" },
          { name: "--max-items <value>", description: "Total number of items to return" },
          { name: "--generate-cli-skeleton <value>", description: "Prints a JSON skeleton" },
          { name: "--debug", description: "Turn on debug logging" },
          { name: "--endpoint-url <value>", description: "Override command's default URL" },
          { name: "--no-verify-ssl", description: "Disable SSL certificate verification" },
          { name: "--no-paginate", description: "Disable automatic pagination" },
          { name: "--output <value>", description: "Output format (json|text|table)" },
          { name: "--query <value>", description: "JMESPath query string" },
          { name: "--profile <value>", description: "Use a specific profile" },
          { name: "--region <value>", description: "AWS region to use" },
          { name: "--version <value>", description: "Display the version" },
          { name: "--color <value>", description: "Turn on/off color output" },
          { name: "--no-sign-request", description: "Do not sign requests" },
          { name: "--ca-bundle <value>", description: "CA certificate bundle" },
          { name: "--cli-read-timeout <value>", description: "Maximum socket read time" },
          { name: "--cli-connect-timeout <value>", description: "Maximum socket connect time" },
          { name: "--cli-binary-format <value>", description: "Format of binary blobs" },
          { name: "--no-cli-pager", description: "Disable CLI pager" },
          { name: "--cli-auto-prompt", description: "Enable auto-prompt mode" },
          { name: "--no-cli-auto-prompt", description: "Disable auto-prompt mode" }
        ]
      },
      {
        name: "run-instances",
        description: "Launches the specified number of instances",
        parameters: [
          { name: "--image-id <value>", description: "The ID of the AMI" },
          { name: "--instance-type <value>", description: "The instance type" },
          { name: "--key-name <value>", description: "The name of the key pair" },
          { name: "--security-groups <value>", description: "One or more security group names" },
          { name: "--count <value>", description: "Number of instances to launch" }
        ]
      },
      {
        name: "start-instances",
        description: "Starts an Amazon EBS-backed instance",
        parameters: [
          { name: "--instance-ids <value>", description: "One or more instance IDs" },
          { name: "--dry-run | --no-dry-run", description: "Checks whether you have the required permissions" }
        ]
      },
      {
        name: "stop-instances",
        description: "Stops an Amazon EBS-backed instance",
        parameters: [
          { name: "--instance-ids <value>", description: "One or more instance IDs" },
          { name: "--force | --no-force", description: "Forces the instances to stop" }
        ]
      },
      {
        name: "terminate-instances",
        description: "Shuts down one or more instances",
        parameters: [
          { name: "--instance-ids <value>", description: "One or more instance IDs" },
          { name: "--dry-run | --no-dry-run", description: "Checks whether you have the required permissions" }
        ]
      },
      {
        name: "reboot-instances",
        description: "Requests a reboot of one or more instances",
        parameters: [
          { name: "--instance-ids <value>", description: "One or more instance IDs" },
          { name: "--dry-run | --no-dry-run", description: "Checks whether you have the required permissions" }
        ]
      },
      {
        name: "accept-address-transfer",
        description: "Accepts an Elastic IP address transfer",
        parameters: [
          { name: "--address <value>", description: "The Elastic IP address" }
        ]
      },
      {
        name: "allocate-address",
        description: "Allocates an Elastic IP address",
        parameters: [
          { name: "--domain <value>", description: "Set to vpc to allocate the address for use with instances in a VPC" },
          { name: "--address <value>", description: "The Elastic IP address to recover" }
        ]
      },
      {
        name: "allocate-hosts",
        description: "Allocates a Dedicated Host",
        parameters: [
          { name: "--instance-type <value>", description: "The instance type" },
          { name: "--quantity <value>", description: "The number of Dedicated Hosts to allocate" }
        ]
      },
      {
        name: "assign-ipv6-addresses",
        description: "Assigns one or more IPv6 addresses to a network interface",
        parameters: [
          { name: "--network-interface-id <value>", description: "The ID of the network interface" },
          { name: "--ipv6-addresses <value>", description: "One or more IPv6 addresses" }
        ]
      },
      {
        name: "assign-private-ip-addresses",
        description: "Assigns one or more secondary private IP addresses",
        parameters: [
          { name: "--network-interface-id <value>", description: "The ID of the network interface" },
          { name: "--private-ip-addresses <value>", description: "One or more IP addresses" }
        ]
      },
      {
        name: "associate-address",
        description: "Associates an Elastic IP address with an instance",
        parameters: [
          { name: "--instance-id <value>", description: "The ID of the instance" },
          { name: "--public-ip <value>", description: "The Elastic IP address" },
          { name: "--allocation-id <value>", description: "The allocation ID" }
        ]
      },
      {
        name: "associate-route-table",
        description: "Associates a subnet with a route table",
        parameters: [
          { name: "--route-table-id <value>", description: "The ID of the route table" },
          { name: "--subnet-id <value>", description: "The ID of the subnet" }
        ]
      },
      {
        name: "attach-internet-gateway",
        description: "Attaches an internet gateway to a VPC",
        parameters: [
          { name: "--internet-gateway-id <value>", description: "The ID of the internet gateway" },
          { name: "--vpc-id <value>", description: "The ID of the VPC" }
        ]
      },
      {
        name: "attach-network-interface",
        description: "Attaches a network interface to an instance",
        parameters: [
          { name: "--network-interface-id <value>", description: "The ID of the network interface" },
          { name: "--instance-id <value>", description: "The ID of the instance" },
          { name: "--device-index <value>", description: "The index of the device" }
        ]
      },
      {
        name: "attach-volume",
        description: "Attaches an EBS volume to a running instance",
        parameters: [
          { name: "--volume-id <value>", description: "The ID of the EBS volume" },
          { name: "--instance-id <value>", description: "The ID of the instance" },
          { name: "--device <value>", description: "The device name" }
        ]
      },
      {
        name: "authorize-security-group-egress",
        description: "Adds egress rules to a security group",
        parameters: [
          { name: "--group-id <value>", description: "The ID of the security group" },
          { name: "--ip-permissions <value>", description: "The sets of IP permissions" }
        ]
      },
      {
        name: "authorize-security-group-ingress",
        description: "Adds ingress rules to a security group",
        parameters: [
          { name: "--group-id <value>", description: "The ID of the security group" },
          { name: "--ip-permissions <value>", description: "The sets of IP permissions" }
        ]
      },
      {
        name: "create-image",
        description: "Creates an Amazon EBS-backed AMI",
        parameters: [
          { name: "--instance-id <value>", description: "The ID of the instance" },
          { name: "--name <value>", description: "A name for the new image" },
          { name: "--description <value>", description: "A description for the new image" }
        ]
      },
      {
        name: "create-key-pair",
        description: "Creates a key pair",
        parameters: [
          { name: "--key-name <value>", description: "A unique name for the key pair" },
          { name: "--key-type <value>", description: "The type of key pair" }
        ]
      },
      {
        name: "create-security-group",
        description: "Creates a security group",
        parameters: [
          { name: "--group-name <value>", description: "The name of the security group" },
          { name: "--description <value>", description: "A description for the security group" },
          { name: "--vpc-id <value>", description: "The ID of the VPC" }
        ]
      },
      {
        name: "create-snapshot",
        description: "Creates a snapshot of an EBS volume",
        parameters: [
          { name: "--volume-id <value>", description: "The ID of the EBS volume" },
          { name: "--description <value>", description: "A description for the snapshot" }
        ]
      },
      {
        name: "create-subnet",
        description: "Creates a subnet in a VPC",
        parameters: [
          { name: "--vpc-id <value>", description: "The ID of the VPC" },
          { name: "--cidr-block <value>", description: "The IPv4 network range" }
        ]
      },
      {
        name: "create-tags",
        description: "Adds or overwrites tags for resources",
        parameters: [
          { name: "--resources <value>", description: "The IDs of the resources" },
          { name: "--tags <value>", description: "The tags to add or overwrite" }
        ]
      },
      {
        name: "create-volume",
        description: "Creates an EBS volume",
        parameters: [
          { name: "--availability-zone <value>", description: "The Availability Zone" },
          { name: "--size <value>", description: "The size of the volume in GiBs" },
          { name: "--volume-type <value>", description: "The volume type" }
        ]
      },
      {
        name: "create-vpc",
        description: "Creates a VPC",
        parameters: [
          { name: "--cidr-block <value>", description: "The IPv4 network range" },
          { name: "--amazon-provided-ipv6-cidr-block", description: "Requests an Amazon-provided IPv6 CIDR block" }
        ]
      },
      {
        name: "delete-key-pair",
        description: "Deletes a key pair",
        parameters: [
          { name: "--key-name <value>", description: "The name of the key pair" }
        ]
      },
      {
        name: "delete-security-group",
        description: "Deletes a security group",
        parameters: [
          { name: "--group-id <value>", description: "The ID of the security group" },
          { name: "--group-name <value>", description: "The name of the security group" }
        ]
      },
      {
        name: "delete-snapshot",
        description: "Deletes a snapshot of an EBS volume",
        parameters: [
          { name: "--snapshot-id <value>", description: "The ID of the EBS snapshot" }
        ]
      },
      {
        name: "delete-volume",
        description: "Deletes an EBS volume",
        parameters: [
          { name: "--volume-id <value>", description: "The ID of the volume" }
        ]
      },
      {
        name: "delete-vpc",
        description: "Deletes a VPC",
        parameters: [
          { name: "--vpc-id <value>", description: "The ID of the VPC" }
        ]
      },
      {
        name: "describe-images",
        description: "Describes one or more images (AMIs)",
        parameters: [
          { name: "--image-ids <value>", description: "One or more image IDs" },
          { name: "--owners <value>", description: "Filters the images by the owner" },
          { name: "--filters <value>", description: "One or more filters" }
        ]
      },
      {
        name: "describe-key-pairs",
        description: "Describes one or more key pairs",
        parameters: [
          { name: "--key-names <value>", description: "One or more key pair names" },
          { name: "--key-pair-ids <value>", description: "One or more key pair IDs" }
        ]
      },
      {
        name: "describe-regions",
        description: "Describes one or more regions",
        parameters: [
          { name: "--region-names <value>", description: "The names of one or more regions" },
          { name: "--all-regions", description: "Include all regions" }
        ]
      },
      {
        name: "describe-security-groups",
        description: "Describes one or more security groups",
        parameters: [
          { name: "--group-ids <value>", description: "One or more security group IDs" },
          { name: "--group-names <value>", description: "One or more security group names" }
        ]
      },
      {
        name: "describe-snapshots",
        description: "Describes one or more EBS snapshots",
        parameters: [
          { name: "--snapshot-ids <value>", description: "One or more snapshot IDs" },
          { name: "--owner-ids <value>", description: "Returns snapshots owned by the specified owner" }
        ]
      },
      {
        name: "describe-subnets",
        description: "Describes one or more subnets",
        parameters: [
          { name: "--subnet-ids <value>", description: "One or more subnet IDs" },
          { name: "--filters <value>", description: "One or more filters" }
        ]
      },
      {
        name: "describe-volumes",
        description: "Describes one or more EBS volumes",
        parameters: [
          { name: "--volume-ids <value>", description: "One or more volume IDs" },
          { name: "--filters <value>", description: "One or more filters" }
        ]
      },
      {
        name: "describe-vpcs",
        description: "Describes one or more VPCs",
        parameters: [
          { name: "--vpc-ids <value>", description: "One or more VPC IDs" },
          { name: "--filters <value>", description: "One or more filters" }
        ]
      },
      {
        name: "detach-internet-gateway",
        description: "Detaches an internet gateway from a VPC",
        parameters: [
          { name: "--internet-gateway-id <value>", description: "The ID of the internet gateway" },
          { name: "--vpc-id <value>", description: "The ID of the VPC" }
        ]
      },
      {
        name: "detach-network-interface",
        description: "Detaches a network interface from an instance",
        parameters: [
          { name: "--attachment-id <value>", description: "The ID of the attachment" },
          { name: "--force", description: "Specifies whether to force a detachment" }
        ]
      },
      {
        name: "detach-volume",
        description: "Detaches an EBS volume from an instance",
        parameters: [
          { name: "--volume-id <value>", description: "The ID of the volume" },
          { name: "--instance-id <value>", description: "The ID of the instance" },
          { name: "--force", description: "Forces detachment" }
        ]
      },
      {
        name: "disassociate-address",
        description: "Disassociates an Elastic IP address",
        parameters: [
          { name: "--association-id <value>", description: "The association ID" },
          { name: "--public-ip <value>", description: "The Elastic IP address" }
        ]
      },
      {
        name: "get-console-output",
        description: "Gets the console output for an instance",
        parameters: [
          { name: "--instance-id <value>", description: "The ID of the instance" },
          { name: "--latest", description: "Retrieve the latest console output" }
        ]
      },
      {
        name: "modify-instance-attribute",
        description: "Modifies an instance attribute",
        parameters: [
          { name: "--instance-id <value>", description: "The ID of the instance" },
          { name: "--instance-type <value>", description: "Changes the instance type" }
        ]
      },
      {
        name: "monitor-instances",
        description: "Enables detailed monitoring for instances",
        parameters: [
          { name: "--instance-ids <value>", description: "One or more instance IDs" }
        ]
      },
      {
        name: "release-address",
        description: "Releases an Elastic IP address",
        parameters: [
          { name: "--allocation-id <value>", description: "The allocation ID" },
          { name: "--public-ip <value>", description: "The Elastic IP address" }
        ]
      },
      {
        name: "revoke-security-group-egress",
        description: "Removes egress rules from a security group",
        parameters: [
          { name: "--group-id <value>", description: "The ID of the security group" },
          { name: "--ip-permissions <value>", description: "The sets of IP permissions" }
        ]
      },
      {
        name: "revoke-security-group-ingress",
        description: "Removes ingress rules from a security group",
        parameters: [
          { name: "--group-id <value>", description: "The ID of the security group" },
          { name: "--ip-permissions <value>", description: "The sets of IP permissions" }
        ]
      },
      {
        name: "unmonitor-instances",
        description: "Disables detailed monitoring for instances",
        parameters: [
          { name: "--instance-ids <value>", description: "One or more instance IDs" }
        ]
      }
    ]
  },
  {
    name: "s3",
    description: "Amazon Simple Storage Service",
    commands: [
      {
        name: "ls",
        description: "List S3 objects and common prefixes",
        parameters: [
          { name: "<S3Uri>", description: "S3 URI (s3://bucket-name/prefix)" },
          { name: "--recursive", description: "List all objects recursively" },
          { name: "--human-readable", description: "Display file sizes in human readable format" },
          { name: "--summarize", description: "Display summary information" }
        ]
      },
      {
        name: "cp",
        description: "Copies a local file or S3 object",
        parameters: [
          { name: "<LocalPath>", description: "Local file path" },
          { name: "<S3Uri>", description: "S3 URI" },
          { name: "--recursive", description: "Copy recursively" },
          { name: "--acl <value>", description: "Set the ACL for the object" }
        ]
      },
      {
        name: "sync",
        description: "Syncs directories and S3 prefixes",
        parameters: [
          { name: "<source>", description: "Source path" },
          { name: "<destination>", description: "Destination path" },
          { name: "--delete", description: "Delete files that don't exist in source" },
          { name: "--exclude <value>", description: "Exclude files matching pattern" },
          { name: "--include <value>", description: "Include files matching pattern" },
          { name: "--acl <value>", description: "Set the ACL for the object" },
          { name: "--storage-class <value>", description: "Storage class for the object" }
        ]
      },
      {
        name: "mb",
        description: "Creates an S3 bucket",
        parameters: [
          { name: "<S3Uri>", description: "S3 URI for the new bucket (s3://bucket-name)" },
          { name: "--region <value>", description: "Region to create the bucket in" }
        ]
      },
      {
        name: "rb",
        description: "Removes an S3 bucket",
        parameters: [
          { name: "<S3Uri>", description: "S3 URI of the bucket to remove" },
          { name: "--force", description: "Delete all objects in the bucket before removing it" }
        ]
      },
      {
        name: "rm",
        description: "Deletes an S3 object",
        parameters: [
          { name: "<S3Uri>", description: "S3 URI of the object to delete" },
          { name: "--recursive", description: "Delete all objects with the specified prefix" },
          { name: "--include <value>", description: "Include files matching pattern" },
          { name: "--exclude <value>", description: "Exclude files matching pattern" }
        ]
      },
      {
        name: "mv",
        description: "Moves a local file or S3 object",
        parameters: [
          { name: "<source>", description: "Source path" },
          { name: "<destination>", description: "Destination path" },
          { name: "--recursive", description: "Move recursively" },
          { name: "--acl <value>", description: "Set the ACL for the object" },
          { name: "--storage-class <value>", description: "Storage class for the object" }
        ]
      },
      {
        name: "presign",
        description: "Generate a pre-signed URL for an S3 object",
        parameters: [
          { name: "<S3Uri>", description: "S3 URI of the object" },
          { name: "--expires-in <value>", description: "Number of seconds until the URL expires (default: 3600)" }
        ]
      },
      {
        name: "website",
        description: "Set the website configuration for a bucket",
        parameters: [
          { name: "<S3Uri>", description: "S3 URI of the bucket" },
          { name: "--index-document <value>", description: "Index document name" },
          { name: "--error-document <value>", description: "Error document name" }
        ]
      },
      {
        name: "du",
        description: "Displays the amount of storage used by an S3 bucket",
        parameters: [
          { name: "<S3Uri>", description: "S3 URI of the bucket or prefix" },
          { name: "--human-readable", description: "Display sizes in human readable format" },
          { name: "--summarize", description: "Display only the total" }
        ]
      },
      {
        name: "sync",
        description: "Syncs directories and S3 prefixes (advanced)",
        parameters: [
          { name: "<source>", description: "Source path" },
          { name: "<destination>", description: "Destination path" },
          { name: "--dryrun", description: "Show what would be done without actually doing it" },
          { name: "--size-only", description: "Skip files based on size only" },
          { name: "--exact-timestamps", description: "Use exact timestamps for comparison" }
        ]
      }
    ]
  },
  {
    name: "s3api",
    description: "Amazon S3 API commands",
    commands: [
      {
        name: "list-buckets",
        description: "Returns a list of all buckets owned by the sender",
        parameters: [
          { name: "--output <value>", description: "Output format (json|text|table)" },
          { name: "--query <value>", description: "JMESPath query string" }
        ]
      },
      {
        name: "create-bucket",
        description: "Creates a new S3 bucket",
        parameters: [
          { name: "--bucket <value>", description: "Name of the bucket" },
          { name: "--acl <value>", description: "Canned ACL to apply" },
          { name: "--create-bucket-configuration <value>", description: "Configuration for creating bucket" }
        ]
      },
      {
        name: "delete-bucket",
        description: "Deletes an S3 bucket",
        parameters: [
          { name: "--bucket <value>", description: "Name of the bucket to delete" }
        ]
      },
      {
        name: "put-object",
        description: "Adds an object to a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--key <value>", description: "Object key" },
          { name: "--body <value>", description: "Object data" },
          { name: "--acl <value>", description: "Canned ACL to apply" },
          { name: "--storage-class <value>", description: "Storage class" },
          { name: "--metadata <value>", description: "User-defined metadata" }
        ]
      },
      {
        name: "get-object",
        description: "Retrieves objects from Amazon S3",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--key <value>", description: "Object key" },
          { name: "<outfile>", description: "Filename where the content will be saved" },
          { name: "--range <value>", description: "Downloads the specified range bytes" }
        ]
      },
      {
        name: "delete-object",
        description: "Removes an object from a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--key <value>", description: "Object key" },
          { name: "--version-id <value>", description: "Version ID of the object" }
        ]
      },
      {
        name: "head-object",
        description: "Retrieves metadata from an object",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--key <value>", description: "Object key" },
          { name: "--version-id <value>", description: "Version ID" }
        ]
      },
      {
        name: "copy-object",
        description: "Creates a copy of an object",
        parameters: [
          { name: "--bucket <value>", description: "Destination bucket name" },
          { name: "--key <value>", description: "Destination object key" },
          { name: "--copy-source <value>", description: "Source bucket and key" },
          { name: "--acl <value>", description: "Canned ACL to apply" }
        ]
      },
      {
        name: "list-objects-v2",
        description: "Returns some or all objects in a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--prefix <value>", description: "Limits response to keys beginning with prefix" },
          { name: "--max-keys <value>", description: "Maximum number of keys to return" },
          { name: "--delimiter <value>", description: "Character used to group keys" }
        ]
      },
      {
        name: "put-bucket-versioning",
        description: "Sets the versioning state of a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--versioning-configuration <value>", description: "Container for setting versioning state" }
        ]
      },
      {
        name: "get-bucket-versioning",
        description: "Returns the versioning state of a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" }
        ]
      },
      {
        name: "put-bucket-policy",
        description: "Applies a bucket policy to a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--policy <value>", description: "Bucket policy as a JSON document" }
        ]
      },
      {
        name: "get-bucket-policy",
        description: "Returns the policy of a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" }
        ]
      },
      {
        name: "delete-bucket-policy",
        description: "Deletes the policy from a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" }
        ]
      },
      {
        name: "put-bucket-encryption",
        description: "Sets default encryption for a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--server-side-encryption-configuration <value>", description: "Encryption configuration" }
        ]
      },
      {
        name: "get-bucket-encryption",
        description: "Returns the encryption configuration of a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" }
        ]
      },
      {
        name: "delete-bucket-encryption",
        description: "Deletes the encryption configuration from a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" }
        ]
      },
      {
        name: "put-bucket-lifecycle-configuration",
        description: "Sets lifecycle configuration for a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--lifecycle-configuration <value>", description: "Lifecycle configuration" }
        ]
      },
      {
        name: "get-bucket-lifecycle-configuration",
        description: "Returns the lifecycle configuration of a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" }
        ]
      },
      {
        name: "put-bucket-cors",
        description: "Sets the CORS configuration for a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--cors-configuration <value>", description: "CORS configuration" }
        ]
      },
      {
        name: "get-bucket-cors",
        description: "Returns the CORS configuration of a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" }
        ]
      },
      {
        name: "put-bucket-logging",
        description: "Set the logging parameters for a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--bucket-logging-status <value>", description: "Logging configuration" }
        ]
      },
      {
        name: "get-bucket-logging",
        description: "Returns the logging status of a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" }
        ]
      },
      {
        name: "put-bucket-tagging",
        description: "Sets tags for a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" },
          { name: "--tagging <value>", description: "Tag set" }
        ]
      },
      {
        name: "get-bucket-tagging",
        description: "Returns the tag set of a bucket",
        parameters: [
          { name: "--bucket <value>", description: "Bucket name" }
        ]
      }
    ]
  },
  {
    name: "lambda",
    description: "AWS Lambda",
    commands: [
      {
        name: "list-functions",
        description: "Returns a list of Lambda functions",
        parameters: [
          { name: "--max-items <value>", description: "Maximum number of items to return" },
          { name: "--function-version <value>", description: "Set to ALL to include all versions" },
          { name: "--master-region <value>", description: "For Lambda@Edge functions, the AWS Region of the master function" }
        ]
      },
      {
        name: "invoke",
        description: "Invokes a Lambda function",
        parameters: [
          { name: "--function-name <value>", description: "Name of the Lambda function" },
          { name: "--payload <value>", description: "JSON payload to send" },
          { name: "--invocation-type <value>", description: "RequestResponse|Event|DryRun" },
          { name: "--log-type <value>", description: "Set to Tail to include execution log" },
          { name: "--qualifier <value>", description: "Version or alias to invoke" }
        ]
      },
      {
        name: "create-function",
        description: "Creates a Lambda function",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--runtime <value>", description: "Runtime environment (python3.9, nodejs18.x, etc)" },
          { name: "--role <value>", description: "ARN of the function's execution role" },
          { name: "--handler <value>", description: "Handler method (index.handler)" },
          { name: "--code <value>", description: "Code for the function" },
          { name: "--description <value>", description: "Description of the function" },
          { name: "--timeout <value>", description: "Function execution timeout in seconds" },
          { name: "--memory-size <value>", description: "Memory size in MB" },
          { name: "--environment <value>", description: "Environment variables" }
        ]
      },
      {
        name: "delete-function",
        description: "Deletes a Lambda function",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function to delete" },
          { name: "--qualifier <value>", description: "Version or alias to delete" }
        ]
      },
      {
        name: "update-function-code",
        description: "Updates a Lambda function's code",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--zip-file <value>", description: "Path to deployment package" },
          { name: "--s3-bucket <value>", description: "S3 bucket containing the code" },
          { name: "--s3-key <value>", description: "S3 key of the deployment package" }
        ]
      },
      {
        name: "update-function-configuration",
        description: "Updates a Lambda function's configuration",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--runtime <value>", description: "Runtime environment" },
          { name: "--role <value>", description: "ARN of the execution role" },
          { name: "--handler <value>", description: "Handler method" },
          { name: "--timeout <value>", description: "Timeout in seconds" },
          { name: "--memory-size <value>", description: "Memory size in MB" }
        ]
      },
      {
        name: "get-function",
        description: "Returns information about a function",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--qualifier <value>", description: "Version or alias" }
        ]
      },
      {
        name: "list-versions-by-function",
        description: "Returns a list of versions",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--max-items <value>", description: "Maximum number of versions to return" }
        ]
      },
      {
        name: "publish-version",
        description: "Creates a version from the current code",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--description <value>", description: "Description for the version" }
        ]
      },
      {
        name: "create-alias",
        description: "Creates an alias for a function version",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--name <value>", description: "Name for the alias" },
          { name: "--function-version <value>", description: "Function version" },
          { name: "--description <value>", description: "Description of the alias" }
        ]
      },
      {
        name: "list-aliases",
        description: "Returns a list of aliases for a function",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--function-version <value>", description: "Version to list aliases for" }
        ]
      },
      {
        name: "add-permission",
        description: "Grants permission to use a function",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--statement-id <value>", description: "Unique statement identifier" },
          { name: "--action <value>", description: "Action that the principal can use" },
          { name: "--principal <value>", description: "AWS service or account" }
        ]
      },
      {
        name: "remove-permission",
        description: "Revokes function-use permission",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--statement-id <value>", description: "Statement ID of the permission" }
        ]
      },
      {
        name: "get-policy",
        description: "Returns the resource-based policy",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--qualifier <value>", description: "Version or alias" }
        ]
      },
      {
        name: "list-event-source-mappings",
        description: "Lists event source mappings",
        parameters: [
          { name: "--function-name <value>", description: "Name of the function" },
          { name: "--event-source-arn <value>", description: "ARN of the event source" }
        ]
      }
    ]
  },
  {
    name: "iam",
    description: "AWS Identity and Access Management",
    commands: [
      {
        name: "list-users",
        description: "Lists the IAM users",
        parameters: [
          { name: "--path-prefix <value>", description: "Path prefix for filtering" },
          { name: "--max-items <value>", description: "Maximum number of items" },
          { name: "--marker <value>", description: "Pagination token" }
        ]
      },
      {
        name: "create-user",
        description: "Creates a new IAM user",
        parameters: [
          { name: "--user-name <value>", description: "Name of the user" },
          { name: "--path <value>", description: "Path for the user" },
          { name: "--permissions-boundary <value>", description: "ARN of the policy for permissions boundary" },
          { name: "--tags <value>", description: "List of tags" }
        ]
      },
      {
        name: "delete-user",
        description: "Deletes an IAM user",
        parameters: [
          { name: "--user-name <value>", description: "Name of the user to delete" }
        ]
      },
      {
        name: "get-user",
        description: "Retrieves information about a user",
        parameters: [
          { name: "--user-name <value>", description: "Name of the user" }
        ]
      },
      {
        name: "list-roles",
        description: "Lists the IAM roles",
        parameters: [
          { name: "--path-prefix <value>", description: "Path prefix for filtering" },
          { name: "--max-items <value>", description: "Maximum number of items" },
          { name: "--marker <value>", description: "Pagination token" }
        ]
      },
      {
        name: "create-role",
        description: "Creates a new IAM role",
        parameters: [
          { name: "--role-name <value>", description: "Name of the role" },
          { name: "--assume-role-policy-document <value>", description: "Trust relationship policy document" },
          { name: "--description <value>", description: "Description of the role" },
          { name: "--max-session-duration <value>", description: "Maximum session duration in seconds" }
        ]
      },
      {
        name: "delete-role",
        description: "Deletes an IAM role",
        parameters: [
          { name: "--role-name <value>", description: "Name of the role to delete" }
        ]
      },
      {
        name: "attach-role-policy",
        description: "Attaches a managed policy to a role",
        parameters: [
          { name: "--role-name <value>", description: "Name of the role" },
          { name: "--policy-arn <value>", description: "ARN of the policy" }
        ]
      },
      {
        name: "detach-role-policy",
        description: "Removes a managed policy from a role",
        parameters: [
          { name: "--role-name <value>", description: "Name of the role" },
          { name: "--policy-arn <value>", description: "ARN of the policy" }
        ]
      },
      {
        name: "list-policies",
        description: "Lists all managed policies",
        parameters: [
          { name: "--scope <value>", description: "Filter by scope (All|AWS|Local)" },
          { name: "--only-attached", description: "Filter to only attached policies" },
          { name: "--path-prefix <value>", description: "Path prefix for filtering" },
          { name: "--max-items <value>", description: "Maximum number of items" }
        ]
      },
      {
        name: "create-policy",
        description: "Creates a new managed policy",
        parameters: [
          { name: "--policy-name <value>", description: "Name of the policy" },
          { name: "--policy-document <value>", description: "JSON policy document" },
          { name: "--description <value>", description: "Description of the policy" },
          { name: "--path <value>", description: "Path for the policy" }
        ]
      },
      {
        name: "delete-policy",
        description: "Deletes a managed policy",
        parameters: [
          { name: "--policy-arn <value>", description: "ARN of the policy to delete" }
        ]
      },
      {
        name: "get-policy",
        description: "Retrieves information about a policy",
        parameters: [
          { name: "--policy-arn <value>", description: "ARN of the policy" }
        ]
      },
      {
        name: "list-groups",
        description: "Lists the IAM groups",
        parameters: [
          { name: "--path-prefix <value>", description: "Path prefix for filtering" },
          { name: "--max-items <value>", description: "Maximum number of items" }
        ]
      },
      {
        name: "create-group",
        description: "Creates a new IAM group",
        parameters: [
          { name: "--group-name <value>", description: "Name of the group" },
          { name: "--path <value>", description: "Path for the group" }
        ]
      },
      {
        name: "delete-group",
        description: "Deletes an IAM group",
        parameters: [
          { name: "--group-name <value>", description: "Name of the group to delete" }
        ]
      },
      {
        name: "add-user-to-group",
        description: "Adds a user to a group",
        parameters: [
          { name: "--group-name <value>", description: "Name of the group" },
          { name: "--user-name <value>", description: "Name of the user" }
        ]
      },
      {
        name: "remove-user-from-group",
        description: "Removes a user from a group",
        parameters: [
          { name: "--group-name <value>", description: "Name of the group" },
          { name: "--user-name <value>", description: "Name of the user" }
        ]
      },
      {
        name: "create-access-key",
        description: "Creates a new access key for a user",
        parameters: [
          { name: "--user-name <value>", description: "Name of the user" }
        ]
      },
      {
        name: "delete-access-key",
        description: "Deletes an access key",
        parameters: [
          { name: "--user-name <value>", description: "Name of the user" },
          { name: "--access-key-id <value>", description: "ID of the access key" }
        ]
      }
    ]
  },
  {
    name: "rds",
    description: "Amazon Relational Database Service",
    commands: [
      {
        name: "describe-db-instances",
        description: "Returns information about provisioned RDS instances",
        parameters: [
          { name: "--db-instance-identifier <value>", description: "DB instance identifier" },
          { name: "--filters <value>", description: "Filter to apply" },
          { name: "--max-records <value>", description: "Maximum number of records" },
          { name: "--marker <value>", description: "Pagination marker" }
        ]
      },
      {
        name: "create-db-instance",
        description: "Creates a new DB instance",
        parameters: [
          { name: "--db-instance-identifier <value>", description: "DB instance identifier" },
          { name: "--db-instance-class <value>", description: "Compute and memory capacity (db.t3.micro, etc)" },
          { name: "--engine <value>", description: "Database engine (mysql, postgres, etc)" },
          { name: "--master-username <value>", description: "Master username" },
          { name: "--master-user-password <value>", description: "Master password" },
          { name: "--allocated-storage <value>", description: "Storage in GB" },
          { name: "--vpc-security-group-ids <value>", description: "VPC security group IDs" },
          { name: "--db-subnet-group-name <value>", description: "DB subnet group name" },
          { name: "--publicly-accessible", description: "Make instance publicly accessible" }
        ]
      },
      {
        name: "delete-db-instance",
        description: "Deletes a DB instance",
        parameters: [
          { name: "--db-instance-identifier <value>", description: "DB instance identifier" },
          { name: "--skip-final-snapshot", description: "Skip creating final snapshot" },
          { name: "--final-db-snapshot-identifier <value>", description: "Final snapshot identifier" }
        ]
      },
      {
        name: "modify-db-instance",
        description: "Modifies a DB instance",
        parameters: [
          { name: "--db-instance-identifier <value>", description: "DB instance identifier" },
          { name: "--db-instance-class <value>", description: "New instance class" },
          { name: "--allocated-storage <value>", description: "New storage size in GB" },
          { name: "--apply-immediately", description: "Apply changes immediately" }
        ]
      },
      {
        name: "start-db-instance",
        description: "Starts a stopped DB instance",
        parameters: [
          { name: "--db-instance-identifier <value>", description: "DB instance identifier" }
        ]
      },
      {
        name: "stop-db-instance",
        description: "Stops a running DB instance",
        parameters: [
          { name: "--db-instance-identifier <value>", description: "DB instance identifier" },
          { name: "--db-snapshot-identifier <value>", description: "Snapshot identifier" }
        ]
      },
      {
        name: "reboot-db-instance",
        description: "Reboots a DB instance",
        parameters: [
          { name: "--db-instance-identifier <value>", description: "DB instance identifier" },
          { name: "--force-failover", description: "Force a failover" }
        ]
      },
      {
        name: "create-db-snapshot",
        description: "Creates a snapshot of a DB instance",
        parameters: [
          { name: "--db-snapshot-identifier <value>", description: "Snapshot identifier" },
          { name: "--db-instance-identifier <value>", description: "DB instance identifier" },
          { name: "--tags <value>", description: "Tags for the snapshot" }
        ]
      },
      {
        name: "delete-db-snapshot",
        description: "Deletes a DB snapshot",
        parameters: [
          { name: "--db-snapshot-identifier <value>", description: "Snapshot identifier" }
        ]
      },
      {
        name: "describe-db-snapshots",
        description: "Returns information about DB snapshots",
        parameters: [
          { name: "--db-instance-identifier <value>", description: "DB instance identifier" },
          { name: "--db-snapshot-identifier <value>", description: "Snapshot identifier" },
          { name: "--snapshot-type <value>", description: "Type of snapshots to list" }
        ]
      },
      {
        name: "restore-db-instance-from-db-snapshot",
        description: "Creates a DB instance from a snapshot",
        parameters: [
          { name: "--db-instance-identifier <value>", description: "New DB instance identifier" },
          { name: "--db-snapshot-identifier <value>", description: "Snapshot identifier" },
          { name: "--db-instance-class <value>", description: "Instance class" }
        ]
      },
      {
        name: "describe-db-clusters",
        description: "Returns information about DB clusters",
        parameters: [
          { name: "--db-cluster-identifier <value>", description: "DB cluster identifier" },
          { name: "--filters <value>", description: "Filters to apply" }
        ]
      }
    ]
  },
  {
    name: "dynamodb",
    description: "Amazon DynamoDB",
    commands: [
      {
        name: "list-tables",
        description: "Returns an array of table names",
        parameters: [
          { name: "--exclusive-start-table-name <value>", description: "First table name to evaluate" },
          { name: "--limit <value>", description: "Maximum number of table names" }
        ]
      },
      {
        name: "create-table",
        description: "Creates a new table",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table" },
          { name: "--attribute-definitions <value>", description: "Array of attributes" },
          { name: "--key-schema <value>", description: "Attributes for the primary key" },
          { name: "--billing-mode <value>", description: "PROVISIONED or PAY_PER_REQUEST" },
          { name: "--provisioned-throughput <value>", description: "Read and write capacity units" }
        ]
      },
      {
        name: "delete-table",
        description: "Deletes a table",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table to delete" }
        ]
      },
      {
        name: "describe-table",
        description: "Returns information about a table",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table" }
        ]
      },
      {
        name: "update-table",
        description: "Modifies a table's settings",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table" },
          { name: "--billing-mode <value>", description: "PROVISIONED or PAY_PER_REQUEST" },
          { name: "--provisioned-throughput <value>", description: "New throughput settings" }
        ]
      },
      {
        name: "put-item",
        description: "Creates a new item or replaces an old item",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table" },
          { name: "--item <value>", description: "Map of attribute name/value pairs" },
          { name: "--condition-expression <value>", description: "Condition for the write" },
          { name: "--return-values <value>", description: "Use NONE, ALL_OLD, etc" }
        ]
      },
      {
        name: "get-item",
        description: "Returns attributes of an item",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table" },
          { name: "--key <value>", description: "Primary key of the item" },
          { name: "--consistent-read", description: "Use strongly consistent read" },
          { name: "--projection-expression <value>", description: "Attributes to retrieve" }
        ]
      },
      {
        name: "delete-item",
        description: "Deletes an item from a table",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table" },
          { name: "--key <value>", description: "Primary key of the item" },
          { name: "--condition-expression <value>", description: "Condition for the delete" }
        ]
      },
      {
        name: "update-item",
        description: "Edits an existing item's attributes",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table" },
          { name: "--key <value>", description: "Primary key of the item" },
          { name: "--update-expression <value>", description: "Expression defining the update" },
          { name: "--condition-expression <value>", description: "Condition for the update" }
        ]
      },
      {
        name: "query",
        description: "Finds items based on primary key values",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table" },
          { name: "--key-condition-expression <value>", description: "Condition for the query" },
          { name: "--filter-expression <value>", description: "Filter to apply after query" },
          { name: "--limit <value>", description: "Maximum number of items" },
          { name: "--consistent-read", description: "Use strongly consistent read" }
        ]
      },
      {
        name: "scan",
        description: "Returns items and attributes",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table" },
          { name: "--filter-expression <value>", description: "Filter to apply" },
          { name: "--limit <value>", description: "Maximum number of items" },
          { name: "--consistent-read", description: "Use strongly consistent read" }
        ]
      },
      {
        name: "batch-get-item",
        description: "Returns attributes of multiple items",
        parameters: [
          { name: "--request-items <value>", description: "Map of table names to key lists" }
        ]
      },
      {
        name: "batch-write-item",
        description: "Puts or deletes multiple items",
        parameters: [
          { name: "--request-items <value>", description: "Map of table names to write requests" }
        ]
      },
      {
        name: "create-backup",
        description: "Creates a backup of a table",
        parameters: [
          { name: "--table-name <value>", description: "Name of the table" },
          { name: "--backup-name <value>", description: "Name for the backup" }
        ]
      },
      {
        name: "describe-backup",
        description: "Describes an existing backup",
        parameters: [
          { name: "--backup-arn <value>", description: "ARN of the backup" }
        ]
      }
    ]
  },

  // ===== ADDITIONAL COMPREHENSIVE AWS SERVICES =====

  // Core Identity & Access Management
  {
    name: "sts",
    description: "AWS Security Token Service",
    commands: [
      {
        name: "assume-role",
        description: "Returns temporary security credentials",
        parameters: [
          { name: "--role-arn <value>", description: "ARN of the role to assume" },
          { name: "--role-session-name <value>", description: "Session identifier" },
          { name: "--duration-seconds <value>", description: "Duration of the session in seconds" },
          { name: "--external-id <value>", description: "Unique identifier for assuming the role" }
        ]
      },
      {
        name: "get-caller-identity",
        description: "Returns details about IAM user or role",
        parameters: []
      },
      {
        name: "get-session-token",
        description: "Returns temporary credentials for an AWS account or IAM user",
        parameters: [
          { name: "--duration-seconds <value>", description: "Duration of credentials in seconds" },
          { name: "--serial-number <value>", description: "Serial number of MFA device" },
          { name: "--token-code <value>", description: "Value from MFA device" }
        ]
      },
      {
        name: "assume-role-with-saml",
        description: "Returns credentials for users authenticated via SAML",
        parameters: [
          { name: "--role-arn <value>", description: "ARN of the role" },
          { name: "--principal-arn <value>", description: "ARN of the SAML provider" },
          { name: "--saml-assertion <value>", description: "Base64 encoded SAML assertion" }
        ]
      },
      {
        name: "assume-role-with-web-identity",
        description: "Returns credentials for users authenticated via web identity",
        parameters: [
          { name: "--role-arn <value>", description: "ARN of the role" },
          { name: "--role-session-name <value>", description: "Session identifier" },
          { name: "--web-identity-token <value>", description: "OAuth 2.0 access token" }
        ]
      },
      {
        name: "decode-authorization-message",
        description: "Decodes an authorization message",
        parameters: [
          { name: "--encoded-message <value>", description: "Encoded message" }
        ]
      },
      {
        name: "get-access-key-info",
        description: "Returns account identifier for an access key",
        parameters: [
          { name: "--access-key-id <value>", description: "Access key ID" }
        ]
      },
      {
        name: "get-federation-token",
        description: "Returns temporary credentials for a federated user",
        parameters: [
          { name: "--name <value>", description: "Name of the federated user" },
          { name: "--policy <value>", description: "IAM policy in JSON format" },
          { name: "--duration-seconds <value>", description: "Duration in seconds" }
        ]
      }
    ]
  },
  {
    name: "kms",
    description: "AWS Key Management Service",
    commands: [
      {
        name: "create-key",
        description: "Creates a KMS key",
        parameters: [
          { name: "--description <value>", description: "Key description" },
          { name: "--key-usage <value>", description: "ENCRYPT_DECRYPT or SIGN_VERIFY" },
          { name: "--origin <value>", description: "AWS_KMS, EXTERNAL, or AWS_CLOUDHSM" },
          { name: "--multi-region", description: "Create a multi-region key" },
          { name: "--customer-master-key-spec <value>", description: "Key spec (SYMMETRIC_DEFAULT, RSA_2048, etc)" }
        ]
      },
      {
        name: "encrypt",
        description: "Encrypts plaintext using a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID or ARN" },
          { name: "--plaintext <value>", description: "Data to encrypt" },
          { name: "--encryption-context <value>", description: "Encryption context key-value pairs" }
        ]
      },
      {
        name: "decrypt",
        description: "Decrypts ciphertext",
        parameters: [
          { name: "--ciphertext-blob <value>", description: "Encrypted data" },
          { name: "--encryption-context <value>", description: "Encryption context" },
          { name: "--key-id <value>", description: "KMS key ID" }
        ]
      },
      {
        name: "list-keys",
        description: "Lists KMS keys",
        parameters: [
          { name: "--limit <value>", description: "Maximum number of keys" }
        ]
      },
      {
        name: "describe-key",
        description: "Provides detailed information about a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID or ARN" }
        ]
      },
      {
        name: "enable-key",
        description: "Enables a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" }
        ]
      },
      {
        name: "disable-key",
        description: "Disables a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" }
        ]
      },
      {
        name: "schedule-key-deletion",
        description: "Schedules deletion of a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--pending-window-in-days <value>", description: "Waiting period (7-30 days)" }
        ]
      },
      {
        name: "cancel-key-deletion",
        description: "Cancels deletion of a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" }
        ]
      },
      {
        name: "create-alias",
        description: "Creates an alias for a KMS key",
        parameters: [
          { name: "--alias-name <value>", description: "Alias name (must start with alias/)" },
          { name: "--target-key-id <value>", description: "KMS key ID" }
        ]
      },
      {
        name: "delete-alias",
        description: "Deletes an alias",
        parameters: [
          { name: "--alias-name <value>", description: "Alias name" }
        ]
      },
      {
        name: "list-aliases",
        description: "Lists all aliases",
        parameters: [
          { name: "--key-id <value>", description: "List aliases for specific key" },
          { name: "--limit <value>", description: "Maximum number of aliases" }
        ]
      },
      {
        name: "generate-data-key",
        description: "Generates a data encryption key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--key-spec <value>", description: "AES_256 or AES_128" },
          { name: "--number-of-bytes <value>", description: "Length of data key" }
        ]
      },
      {
        name: "re-encrypt",
        description: "Re-encrypts data with a different KMS key",
        parameters: [
          { name: "--ciphertext-blob <value>", description: "Encrypted data" },
          { name: "--destination-key-id <value>", description: "New KMS key ID" }
        ]
      },
      {
        name: "put-key-policy",
        description: "Attaches a key policy to a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--policy-name <value>", description: "Policy name (usually 'default')" },
          { name: "--policy <value>", description: "Key policy JSON document" }
        ]
      },
      {
        name: "get-key-policy",
        description: "Gets a key policy attached to a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--policy-name <value>", description: "Policy name" }
        ]
      },
      {
        name: "create-grant",
        description: "Adds a grant to a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--grantee-principal <value>", description: "Principal receiving the grant" },
          { name: "--operations <value>", description: "List of operations the grant permits" },
          { name: "--retiring-principal <value>", description: "Principal that can retire the grant" }
        ]
      },
      {
        name: "retire-grant",
        description: "Retires a grant",
        parameters: [
          { name: "--grant-token <value>", description: "Grant token" },
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--grant-id <value>", description: "Grant ID" }
        ]
      },
      {
        name: "revoke-grant",
        description: "Revokes a grant",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--grant-id <value>", description: "Grant ID to revoke" }
        ]
      },
      {
        name: "list-grants",
        description: "Lists grants for a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--limit <value>", description: "Maximum number of grants" }
        ]
      },
      {
        name: "update-key-description",
        description: "Updates the description of a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--description <value>", description: "New description" }
        ]
      },
      {
        name: "enable-key-rotation",
        description: "Enables automatic rotation of a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" }
        ]
      },
      {
        name: "disable-key-rotation",
        description: "Disables automatic rotation of a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" }
        ]
      },
      {
        name: "get-key-rotation-status",
        description: "Gets the rotation status of a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" }
        ]
      },
      {
        name: "import-key-material",
        description: "Imports key material into a KMS key",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--import-token <value>", description: "Import token" },
          { name: "--encrypted-key-material <value>", description: "Encrypted key material" },
          { name: "--expiration-model <value>", description: "KEY_MATERIAL_EXPIRES or KEY_MATERIAL_DOES_NOT_EXPIRE" }
        ]
      },
      {
        name: "delete-imported-key-material",
        description: "Deletes imported key material",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" }
        ]
      },
      {
        name: "get-parameters-for-import",
        description: "Returns parameters for importing key material",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--wrapping-algorithm <value>", description: "Algorithm to encrypt key material" },
          { name: "--wrapping-key-spec <value>", description: "Type of wrapping key" }
        ]
      },
      {
        name: "sign",
        description: "Creates a digital signature for a message",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--message <value>", description: "Message to sign" },
          { name: "--signing-algorithm <value>", description: "Signing algorithm" }
        ]
      },
      {
        name: "verify",
        description: "Verifies a digital signature",
        parameters: [
          { name: "--key-id <value>", description: "KMS key ID" },
          { name: "--message <value>", description: "Message that was signed" },
          { name: "--signature <value>", description: "Signature to verify" },
          { name: "--signing-algorithm <value>", description: "Signing algorithm" }
        ]
      }
    ]
  },
  {
    name: "secretsmanager",
    description: "AWS Secrets Manager",
    commands: [
      {
        name: "create-secret",
        description: "Creates a new secret",
        parameters: [
          { name: "--name <value>", description: "Secret name" },
          { name: "--secret-string <value>", description: "Secret value as string" },
          { name: "--secret-binary <value>", description: "Secret value as binary" },
          { name: "--description <value>", description: "Description of the secret" },
          { name: "--kms-key-id <value>", description: "KMS key ID for encryption" },
          { name: "--tags <value>", description: "Tags for the secret" }
        ]
      },
      {
        name: "get-secret-value",
        description: "Retrieves the value of a secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--version-id <value>", description: "Version ID" },
          { name: "--version-stage <value>", description: "Version stage (AWSCURRENT, AWSPENDING)" }
        ]
      },
      {
        name: "list-secrets",
        description: "Lists all secrets",
        parameters: [
          { name: "--max-results <value>", description: "Maximum number of results" },
          { name: "--filters <value>", description: "Filters to apply" }
        ]
      },
      {
        name: "delete-secret",
        description: "Deletes a secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--recovery-window-in-days <value>", description: "Recovery window (7-30 days)" },
          { name: "--force-delete-without-recovery", description: "Delete immediately without recovery" }
        ]
      },
      {
        name: "update-secret",
        description: "Updates a secret value",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--secret-string <value>", description: "New secret value" },
          { name: "--description <value>", description: "New description" },
          { name: "--kms-key-id <value>", description: "New KMS key ID" }
        ]
      },
      {
        name: "describe-secret",
        description: "Retrieves metadata about a secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" }
        ]
      },
      {
        name: "restore-secret",
        description: "Restores a deleted secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" }
        ]
      },
      {
        name: "rotate-secret",
        description: "Rotates a secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--rotation-lambda-arn <value>", description: "ARN of rotation Lambda function" }
        ]
      },
      {
        name: "put-secret-value",
        description: "Creates a new version of a secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--secret-string <value>", description: "Secret value" },
          { name: "--version-stages <value>", description: "Version stages" }
        ]
      },
      {
        name: "tag-resource",
        description: "Adds tags to a secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--tags <value>", description: "Tags to add" }
        ]
      },
      {
        name: "untag-resource",
        description: "Removes tags from a secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--tag-keys <value>", description: "Tag keys to remove" }
        ]
      },
      {
        name: "cancel-rotate-secret",
        description: "Cancels a rotation in progress",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--version-id <value>", description: "Version ID" }
        ]
      },
      {
        name: "get-resource-policy",
        description: "Retrieves the resource policy attached to a secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" }
        ]
      },
      {
        name: "put-resource-policy",
        description: "Attaches a resource policy to a secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--resource-policy <value>", description: "JSON policy document" }
        ]
      },
      {
        name: "delete-resource-policy",
        description: "Deletes the resource policy attached to a secret",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" }
        ]
      },
      {
        name: "replicate-secret-to-regions",
        description: "Replicates a secret to additional regions",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--add-replica-regions <value>", description: "Regions to replicate to" }
        ]
      },
      {
        name: "remove-regions-from-replication",
        description: "Removes regions from replication",
        parameters: [
          { name: "--secret-id <value>", description: "Secret ARN or name" },
          { name: "--remove-replica-regions <value>", description: "Regions to remove" }
        ]
      }
    ]
  },
  {
    name: "cognito-idp",
    description: "Amazon Cognito Identity Provider",
    commands: [
      {
        name: "create-user-pool",
        description: "Creates a new user pool",
        parameters: [
          { name: "--pool-name <value>", description: "Name of the user pool" },
          { name: "--policies <value>", description: "Password policies" },
          { name: "--auto-verified-attributes <value>", description: "Attributes to auto-verify (email, phone)" },
          { name: "--mfa-configuration <value>", description: "OFF, ON, or OPTIONAL" }
        ]
      },
      {
        name: "list-user-pools",
        description: "Lists all user pools",
        parameters: [
          { name: "--max-results <value>", description: "Maximum number of results" },
          { name: "--next-token <value>", description: "Pagination token" }
        ]
      },
      {
        name: "describe-user-pool",
        description: "Returns information about a user pool",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" }
        ]
      },
      {
        name: "delete-user-pool",
        description: "Deletes a user pool",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" }
        ]
      },
      {
        name: "admin-create-user",
        description: "Creates a new user in a user pool",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--username <value>", description: "Username" },
          { name: "--user-attributes <value>", description: "User attributes" },
          { name: "--temporary-password <value>", description: "Temporary password" },
          { name: "--message-action <value>", description: "SUPPRESS or RESEND" }
        ]
      },
      {
        name: "admin-delete-user",
        description: "Deletes a user from a user pool",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--username <value>", description: "Username" }
        ]
      },
      {
        name: "admin-get-user",
        description: "Gets information about a user",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--username <value>", description: "Username" }
        ]
      },
      {
        name: "list-users",
        description: "Lists users in a user pool",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--limit <value>", description: "Maximum number of users" },
          { name: "--filter <value>", description: "Filter expression" }
        ]
      },
      {
        name: "admin-set-user-password",
        description: "Sets a user's password",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--username <value>", description: "Username" },
          { name: "--password <value>", description: "New password" },
          { name: "--permanent", description: "Set as permanent password" }
        ]
      },
      {
        name: "admin-reset-user-password",
        description: "Resets a user's password",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--username <value>", description: "Username" }
        ]
      },
      {
        name: "create-user-pool-client",
        description: "Creates a user pool client",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--client-name <value>", description: "Client name" },
          { name: "--generate-secret", description: "Generate client secret" }
        ]
      },
      {
        name: "list-user-pool-clients",
        description: "Lists user pool clients",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--max-results <value>", description: "Maximum number of results" }
        ]
      },
      {
        name: "admin-enable-user",
        description: "Enables a user",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--username <value>", description: "Username" }
        ]
      },
      {
        name: "admin-disable-user",
        description: "Disables a user",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--username <value>", description: "Username" }
        ]
      },
      {
        name: "admin-confirm-sign-up",
        description: "Confirms user registration",
        parameters: [
          { name: "--user-pool-id <value>", description: "User pool ID" },
          { name: "--username <value>", description: "Username" }
        ]
      }
    ]
  },
  {
    name: "codebuild",
    description: "AWS CodeBuild",
    commands: [
      {
        name: "create-project",
        description: "Creates a build project",
        parameters: [
          { name: "--name <value>", description: "Project name" },
          { name: "--source <value>", description: "Source code settings" },
          { name: "--artifacts <value>", description: "Build output settings" },
          { name: "--environment <value>", description: "Build environment settings" },
          { name: "--service-role <value>", description: "ARN of the IAM role" }
        ]
      },
      {
        name: "list-projects",
        description: "Lists build project names",
        parameters: [
          { name: "--sort-by <value>", description: "Sort by NAME or CREATED_TIME" },
          { name: "--sort-order <value>", description: "ASCENDING or DESCENDING" }
        ]
      },
      {
        name: "batch-get-projects",
        description: "Gets information about build projects",
        parameters: [
          { name: "--names <value>", description: "Names of the build projects" }
        ]
      },
      {
        name: "delete-project",
        description: "Deletes a build project",
        parameters: [
          { name: "--name <value>", description: "Name of the build project" }
        ]
      },
      {
        name: "start-build",
        description: "Starts running a build",
        parameters: [
          { name: "--project-name <value>", description: "Name of the build project" },
          { name: "--source-version <value>", description: "Version of source code" },
          { name: "--environment-variables-override <value>", description: "Environment variables" }
        ]
      },
      {
        name: "stop-build",
        description: "Stops a running build",
        parameters: [
          { name: "--id <value>", description: "ID of the build" }
        ]
      },
      {
        name: "batch-get-builds",
        description: "Gets information about builds",
        parameters: [
          { name: "--ids <value>", description: "IDs of the builds" }
        ]
      },
      {
        name: "list-builds",
        description: "Lists build IDs",
        parameters: [
          { name: "--sort-order <value>", description: "ASCENDING or DESCENDING" }
        ]
      },
      {
        name: "list-builds-for-project",
        description: "Lists build IDs for a project",
        parameters: [
          { name: "--project-name <value>", description: "Name of the build project" },
          { name: "--sort-order <value>", description: "ASCENDING or DESCENDING" }
        ]
      },
      {
        name: "update-project",
        description: "Updates a build project",
        parameters: [
          { name: "--name <value>", description: "Name of the build project" },
          { name: "--source <value>", description: "New source settings" },
          { name: "--environment <value>", description: "New environment settings" }
        ]
      },
      {
        name: "create-webhook",
        description: "Creates a webhook for a project",
        parameters: [
          { name: "--project-name <value>", description: "Name of the build project" },
          { name: "--filter-groups <value>", description: "Webhook filter groups" }
        ]
      },
      {
        name: "delete-webhook",
        description: "Deletes a webhook",
        parameters: [
          { name: "--project-name <value>", description: "Name of the build project" }
        ]
      }
    ]
  },
  {
    name: "stepfunctions",
    description: "AWS Step Functions",
    commands: [
      {
        name: "create-state-machine",
        description: "Creates a state machine",
        parameters: [
          { name: "--name <value>", description: "Name of the state machine" },
          { name: "--definition <value>", description: "Amazon States Language definition" },
          { name: "--role-arn <value>", description: "ARN of the IAM role" },
          { name: "--type <value>", description: "STANDARD or EXPRESS" }
        ]
      },
      {
        name: "list-state-machines",
        description: "Lists state machines",
        parameters: [
          { name: "--max-results <value>", description: "Maximum number of results" },
          { name: "--next-token <value>", description: "Pagination token" }
        ]
      },
      {
        name: "describe-state-machine",
        description: "Describes a state machine",
        parameters: [
          { name: "--state-machine-arn <value>", description: "ARN of the state machine" }
        ]
      },
      {
        name: "delete-state-machine",
        description: "Deletes a state machine",
        parameters: [
          { name: "--state-machine-arn <value>", description: "ARN of the state machine" }
        ]
      },
      {
        name: "update-state-machine",
        description: "Updates a state machine",
        parameters: [
          { name: "--state-machine-arn <value>", description: "ARN of the state machine" },
          { name: "--definition <value>", description: "New definition" },
          { name: "--role-arn <value>", description: "New IAM role ARN" }
        ]
      },
      {
        name: "start-execution",
        description: "Starts a state machine execution",
        parameters: [
          { name: "--state-machine-arn <value>", description: "ARN of the state machine" },
          { name: "--name <value>", description: "Execution name" },
          { name: "--input <value>", description: "JSON input for the execution" }
        ]
      },
      {
        name: "stop-execution",
        description: "Stops a state machine execution",
        parameters: [
          { name: "--execution-arn <value>", description: "ARN of the execution" },
          { name: "--error <value>", description: "Error code" },
          { name: "--cause <value>", description: "Error cause" }
        ]
      },
      {
        name: "list-executions",
        description: "Lists executions of a state machine",
        parameters: [
          { name: "--state-machine-arn <value>", description: "ARN of the state machine" },
          { name: "--status-filter <value>", description: "RUNNING, SUCCEEDED, FAILED, etc" },
          { name: "--max-results <value>", description: "Maximum number of results" }
        ]
      },
      {
        name: "describe-execution",
        description: "Describes an execution",
        parameters: [
          { name: "--execution-arn <value>", description: "ARN of the execution" }
        ]
      },
      {
        name: "get-execution-history",
        description: "Returns execution history",
        parameters: [
          { name: "--execution-arn <value>", description: "ARN of the execution" },
          { name: "--max-results <value>", description: "Maximum number of results" },
          { name: "--reverse-order", description: "List events in reverse order" }
        ]
      },
      {
        name: "list-activities",
        description: "Lists activities",
        parameters: [
          { name: "--max-results <value>", description: "Maximum number of results" },
          { name: "--next-token <value>", description: "Pagination token" }
        ]
      },
      {
        name: "create-activity",
        description: "Creates an activity",
        parameters: [
          { name: "--name <value>", description: "Name of the activity" },
          { name: "--tags <value>", description: "Tags for the activity" }
        ]
      },
      {
        name: "delete-activity",
        description: "Deletes an activity",
        parameters: [
          { name: "--activity-arn <value>", description: "ARN of the activity" }
        ]
      },
      {
        name: "describe-activity",
        description: "Describes an activity",
        parameters: [
          { name: "--activity-arn <value>", description: "ARN of the activity" }
        ]
      },
      {
        name: "send-task-success",
        description: "Reports a task success",
        parameters: [
          { name: "--task-token <value>", description: "Task token" },
          { name: "--output <value>", description: "JSON output" }
        ]
      }
    ]
  },
  {
    name: "organizations",
    description: "AWS Organizations",
    commands: [
      { name: "list-accounts", description: "Lists all accounts", parameters: [] },
      { name: "describe-organization", description: "Describes the organization", parameters: [] },
      { name: "create-account", description: "Creates an AWS account", parameters: [{ name: "--email <value>", description: "Account email" }, { name: "--account-name <value>", description: "Account name" }] }
    ]
  },
  {
    name: "sso",
    description: "AWS IAM Identity Center / SSO",
    commands: [
      { name: "list-accounts", description: "Lists AWS accounts", parameters: [{ name: "--access-token <value>", description: "Access token" }] },
      { name: "get-role-credentials", description: "Returns role credentials", parameters: [{ name: "--role-name <value>", description: "Role name" }, { name: "--account-id <value>", description: "Account ID" }] }
    ]
  },
  {
    name: "cloudformation",
    description: "AWS CloudFormation",
    commands: [
      { name: "create-stack", description: "Creates a stack", parameters: [{ name: "--stack-name <value>", description: "Stack name" }, { name: "--template-body <value>", description: "Template body" }] },
      { name: "update-stack", description: "Updates a stack", parameters: [{ name: "--stack-name <value>", description: "Stack name" }] },
      { name: "delete-stack", description: "Deletes a stack", parameters: [{ name: "--stack-name <value>", description: "Stack name" }] },
      { name: "describe-stacks", description: "Describes stacks", parameters: [] },
      { name: "list-stacks", description: "Lists stacks", parameters: [] }
    ]
  },

  // Compute & Containers
  {
    name: "lightsail",
    description: "Amazon Lightsail",
    commands: [
      { name: "create-instances", description: "Creates instances", parameters: [{ name: "--instance-names <value>", description: "Instance names" }, { name: "--blueprint-id <value>", description: "Blueprint ID" }] },
      { name: "get-instances", description: "Gets instance information", parameters: [] }
    ]
  },
  {
    name: "ecs",
    description: "Amazon Elastic Container Service",
    commands: [
      { name: "create-cluster", description: "Creates an ECS cluster", parameters: [{ name: "--cluster-name <value>", description: "Cluster name" }] },
      { name: "list-clusters", description: "Lists ECS clusters", parameters: [] },
      { name: "create-service", description: "Creates a service", parameters: [{ name: "--cluster <value>", description: "Cluster name" }, { name: "--service-name <value>", description: "Service name" }] },
      { name: "run-task", description: "Runs a task", parameters: [{ name: "--cluster <value>", description: "Cluster name" }, { name: "--task-definition <value>", description: "Task definition" }] },
      { name: "list-tasks", description: "Lists tasks", parameters: [{ name: "--cluster <value>", description: "Cluster name" }] }
    ]
  },
  {
    name: "eks",
    description: "Amazon Elastic Kubernetes Service",
    commands: [
      { name: "create-cluster", description: "Creates an EKS cluster", parameters: [{ name: "--name <value>", description: "Cluster name" }, { name: "--role-arn <value>", description: "IAM role ARN" }] },
      { name: "list-clusters", description: "Lists EKS clusters", parameters: [] },
      { name: "describe-cluster", description: "Describes a cluster", parameters: [{ name: "--name <value>", description: "Cluster name" }] },
      { name: "update-kubeconfig", description: "Updates kubeconfig", parameters: [{ name: "--name <value>", description: "Cluster name" }] }
    ]
  },
  {
    name: "elasticbeanstalk",
    description: "AWS Elastic Beanstalk",
    commands: [
      { name: "create-application", description: "Creates an application", parameters: [{ name: "--application-name <value>", description: "App name" }] },
      { name: "create-environment", description: "Creates an environment", parameters: [{ name: "--application-name <value>", description: "App name" }, { name: "--environment-name <value>", description: "Env name" }] },
      { name: "describe-environments", description: "Describes environments", parameters: [] }
    ]
  },
  {
    name: "ecr",
    description: "Amazon Elastic Container Registry",
    commands: [
      { name: "create-repository", description: "Creates a repository", parameters: [{ name: "--repository-name <value>", description: "Repository name" }] },
      { name: "describe-repositories", description: "Describes repositories", parameters: [] },
      { name: "get-login-password", description: "Gets Docker login password", parameters: [] },
      { name: "list-images", description: "Lists images", parameters: [{ name: "--repository-name <value>", description: "Repository name" }] }
    ]
  },

  // Storage & Data Services
  {
    name: "efs",
    description: "Amazon Elastic File System",
    commands: [
      { name: "create-file-system", description: "Creates a file system", parameters: [] },
      { name: "describe-file-systems", description: "Describes file systems", parameters: [] },
      { name: "delete-file-system", description: "Deletes a file system", parameters: [{ name: "--file-system-id <value>", description: "File system ID" }] }
    ]
  },
  {
    name: "glacier",
    description: "Amazon S3 Glacier",
    commands: [
      { name: "create-vault", description: "Creates a vault", parameters: [{ name: "--vault-name <value>", description: "Vault name" }] },
      { name: "list-vaults", description: "Lists vaults", parameters: [] },
      { name: "upload-archive", description: "Uploads an archive", parameters: [{ name: "--vault-name <value>", description: "Vault name" }, { name: "--body <value>", description: "Archive data" }] }
    ]
  },
  {
    name: "athena",
    description: "Amazon Athena",
    commands: [
      { name: "start-query-execution", description: "Starts a query", parameters: [{ name: "--query-string <value>", description: "SQL query" }, { name: "--result-configuration <value>", description: "Result config" }] },
      { name: "get-query-execution", description: "Gets query execution", parameters: [{ name: "--query-execution-id <value>", description: "Query ID" }] },
      { name: "list-query-executions", description: "Lists query executions", parameters: [] }
    ]
  },
  {
    name: "sagemaker",
    description: "Amazon SageMaker",
    commands: [
      { name: "create-notebook-instance", description: "Creates notebook instance", parameters: [{ name: "--notebook-instance-name <value>", description: "Instance name" }, { name: "--instance-type <value>", description: "Instance type" }] },
      { name: "list-notebook-instances", description: "Lists notebook instances", parameters: [] },
      { name: "create-model", description: "Creates a model", parameters: [{ name: "--model-name <value>", description: "Model name" }] },
      { name: "list-models", description: "Lists models", parameters: [] }
    ]
  },

  // Networking & Connectivity
  {
    name: "apigateway",
    description: "Amazon API Gateway",
    commands: [
      { name: "create-rest-api", description: "Creates a REST API", parameters: [{ name: "--name <value>", description: "API name" }] },
      { name: "get-rest-apis", description: "Gets REST APIs", parameters: [] },
      { name: "create-deployment", description: "Creates a deployment", parameters: [{ name: "--rest-api-id <value>", description: "API ID" }, { name: "--stage-name <value>", description: "Stage name" }] }
    ]
  },
  {
    name: "cloudfront",
    description: "Amazon CloudFront",
    commands: [
      { name: "create-distribution", description: "Creates a distribution", parameters: [{ name: "--distribution-config <value>", description: "Distribution config" }] },
      { name: "list-distributions", description: "Lists distributions", parameters: [] },
      { name: "create-invalidation", description: "Creates an invalidation", parameters: [{ name: "--distribution-id <value>", description: "Distribution ID" }, { name: "--paths <value>", description: "Paths to invalidate" }] }
    ]
  },
  {
    name: "elbv2",
    description: "Elastic Load Balancing v2",
    commands: [
      { name: "create-load-balancer", description: "Creates a load balancer", parameters: [{ name: "--name <value>", description: "LB name" }, { name: "--subnets <value>", description: "Subnets" }] },
      { name: "describe-load-balancers", description: "Describes load balancers", parameters: [] },
      { name: "create-target-group", description: "Creates a target group", parameters: [{ name: "--name <value>", description: "Target group name" }] }
    ]
  },

  // Databases & Data Warehousing
  {
    name: "redshift",
    description: "Amazon Redshift",
    commands: [
      { name: "create-cluster", description: "Creates a cluster", parameters: [{ name: "--cluster-identifier <value>", description: "Cluster ID" }, { name: "--node-type <value>", description: "Node type" }] },
      { name: "describe-clusters", description: "Describes clusters", parameters: [] },
      { name: "delete-cluster", description: "Deletes a cluster", parameters: [{ name: "--cluster-identifier <value>", description: "Cluster ID" }] }
    ]
  },
  {
    name: "docdb",
    description: "Amazon DocumentDB",
    commands: [
      { name: "create-db-cluster", description: "Creates a DB cluster", parameters: [{ name: "--db-cluster-identifier <value>", description: "Cluster ID" }] },
      { name: "describe-db-clusters", description: "Describes DB clusters", parameters: [] }
    ]
  },

  // Messaging & Queueing
  {
    name: "sqs",
    description: "Amazon Simple Queue Service",
    commands: [
      {
        name: "create-queue",
        description: "Creates a new queue",
        parameters: [
          { name: "--queue-name <value>", description: "Name of the queue" },
          { name: "--attributes <value>", description: "Queue attributes (VisibilityTimeout, MessageRetentionPeriod, etc)" },
          { name: "--tags <value>", description: "Tags for the queue" }
        ]
      },
      {
        name: "list-queues",
        description: "Lists all queues",
        parameters: [
          { name: "--queue-name-prefix <value>", description: "Filter by queue name prefix" },
          { name: "--max-results <value>", description: "Maximum number of results" }
        ]
      },
      {
        name: "get-queue-url",
        description: "Returns the URL of a queue",
        parameters: [
          { name: "--queue-name <value>", description: "Name of the queue" },
          { name: "--queue-owner-aws-account-id <value>", description: "AWS account ID" }
        ]
      },
      {
        name: "delete-queue",
        description: "Deletes a queue",
        parameters: [
          { name: "--queue-url <value>", description: "URL of the queue" }
        ]
      },
      {
        name: "send-message",
        description: "Sends a message to a queue",
        parameters: [
          { name: "--queue-url <value>", description: "URL of the queue" },
          { name: "--message-body <value>", description: "Message body" },
          { name: "--delay-seconds <value>", description: "Delay in seconds" },
          { name: "--message-attributes <value>", description: "Message attributes" }
        ]
      },
      {
        name: "send-message-batch",
        description: "Sends multiple messages to a queue",
        parameters: [
          { name: "--queue-url <value>", description: "URL of the queue" },
          { name: "--entries <value>", description: "List of messages" }
        ]
      },
      {
        name: "receive-message",
        description: "Receives messages from a queue",
        parameters: [
          { name: "--queue-url <value>", description: "URL of the queue" },
          { name: "--max-number-of-messages <value>", description: "Maximum messages to receive (1-10)" },
          { name: "--visibility-timeout <value>", description: "Visibility timeout in seconds" },
          { name: "--wait-time-seconds <value>", description: "Long polling wait time" },
          { name: "--attribute-names <value>", description: "Attributes to return" }
        ]
      },
      {
        name: "delete-message",
        description: "Deletes a message from a queue",
        parameters: [
          { name: "--queue-url <value>", description: "URL of the queue" },
          { name: "--receipt-handle <value>", description: "Receipt handle from receive-message" }
        ]
      },
      {
        name: "delete-message-batch",
        description: "Deletes multiple messages from a queue",
        parameters: [
          { name: "--queue-url <value>", description: "URL of the queue" },
          { name: "--entries <value>", description: "List of receipt handles" }
        ]
      },
      {
        name: "purge-queue",
        description: "Deletes all messages in a queue",
        parameters: [
          { name: "--queue-url <value>", description: "URL of the queue" }
        ]
      },
      {
        name: "get-queue-attributes",
        description: "Gets attributes of a queue",
        parameters: [
          { name: "--queue-url <value>", description: "URL of the queue" },
          { name: "--attribute-names <value>", description: "Attributes to retrieve" }
        ]
      },
      {
        name: "set-queue-attributes",
        description: "Sets attributes of a queue",
        parameters: [
          { name: "--queue-url <value>", description: "URL of the queue" },
          { name: "--attributes <value>", description: "Attributes to set" }
        ]
      }
    ]
  },
  {
    name: "sns",
    description: "Amazon Simple Notification Service",
    commands: [
      {
        name: "create-topic",
        description: "Creates a new SNS topic",
        parameters: [
          { name: "--name <value>", description: "Topic name" },
          { name: "--attributes <value>", description: "Topic attributes" },
          { name: "--tags <value>", description: "Tags for the topic" }
        ]
      },
      {
        name: "list-topics",
        description: "Lists all SNS topics",
        parameters: [
          { name: "--next-token <value>", description: "Pagination token" }
        ]
      },
      {
        name: "delete-topic",
        description: "Deletes an SNS topic",
        parameters: [
          { name: "--topic-arn <value>", description: "ARN of the topic" }
        ]
      },
      {
        name: "subscribe",
        description: "Subscribes an endpoint to a topic",
        parameters: [
          { name: "--topic-arn <value>", description: "ARN of the topic" },
          { name: "--protocol <value>", description: "email, sms, sqs, lambda, http, https" },
          { name: "--endpoint <value>", description: "Endpoint to receive notifications" },
          { name: "--return-subscription-arn", description: "Return subscription ARN" }
        ]
      },
      {
        name: "unsubscribe",
        description: "Unsubscribes from a topic",
        parameters: [
          { name: "--subscription-arn <value>", description: "ARN of the subscription" }
        ]
      },
      {
        name: "list-subscriptions",
        description: "Lists all subscriptions",
        parameters: [
          { name: "--next-token <value>", description: "Pagination token" }
        ]
      },
      {
        name: "list-subscriptions-by-topic",
        description: "Lists subscriptions for a topic",
        parameters: [
          { name: "--topic-arn <value>", description: "ARN of the topic" },
          { name: "--next-token <value>", description: "Pagination token" }
        ]
      },
      {
        name: "publish",
        description: "Publishes a message to a topic",
        parameters: [
          { name: "--topic-arn <value>", description: "ARN of the topic" },
          { name: "--message <value>", description: "Message to publish" },
          { name: "--subject <value>", description: "Message subject" },
          { name: "--message-attributes <value>", description: "Message attributes" },
          { name: "--message-structure <value>", description: "json for different protocols" }
        ]
      },
      {
        name: "get-topic-attributes",
        description: "Gets attributes of a topic",
        parameters: [
          { name: "--topic-arn <value>", description: "ARN of the topic" }
        ]
      },
      {
        name: "set-topic-attributes",
        description: "Sets attributes of a topic",
        parameters: [
          { name: "--topic-arn <value>", description: "ARN of the topic" },
          { name: "--attribute-name <value>", description: "Attribute name" },
          { name: "--attribute-value <value>", description: "Attribute value" }
        ]
      },
      {
        name: "confirm-subscription",
        description: "Confirms a subscription",
        parameters: [
          { name: "--topic-arn <value>", description: "ARN of the topic" },
          { name: "--token <value>", description: "Confirmation token" }
        ]
      },
      {
        name: "add-permission",
        description: "Adds a statement to a topic's access policy",
        parameters: [
          { name: "--topic-arn <value>", description: "ARN of the topic" },
          { name: "--label <value>", description: "Unique identifier for the statement" },
          { name: "--aws-account-id <value>", description: "AWS account IDs" },
          { name: "--action-name <value>", description: "Actions to allow" }
        ]
      }
    ]
  },
  {
    name: "mq",
    description: "Amazon MQ",
    commands: [
      { name: "create-broker", description: "Creates a broker", parameters: [{ name: "--broker-name <value>", description: "Broker name" }, { name: "--engine-type <value>", description: "Engine type" }] },
      { name: "list-brokers", description: "Lists brokers", parameters: [] },
      { name: "describe-broker", description: "Describes a broker", parameters: [{ name: "--broker-id <value>", description: "Broker ID" }] }
    ]
  },

  // Management, Auditing & Security
  {
    name: "cloudtrail",
    description: "AWS CloudTrail",
    commands: [
      { name: "create-trail", description: "Creates a trail", parameters: [{ name: "--name <value>", description: "Trail name" }, { name: "--s3-bucket-name <value>", description: "S3 bucket" }] },
      { name: "list-trails", description: "Lists trails", parameters: [] },
      { name: "start-logging", description: "Starts logging", parameters: [{ name: "--name <value>", description: "Trail name" }] },
      { name: "lookup-events", description: "Looks up events", parameters: [] }
    ]
  },
  {
    name: "guardduty",
    description: "Amazon GuardDuty",
    commands: [
      { name: "create-detector", description: "Creates a detector", parameters: [{ name: "--enable", description: "Enable detector" }] },
      { name: "list-detectors", description: "Lists detectors", parameters: [] },
      { name: "list-findings", description: "Lists findings", parameters: [{ name: "--detector-id <value>", description: "Detector ID" }] }
    ]
  },
  {
    name: "ssm",
    description: "AWS Systems Manager",
    commands: [
      {
        name: "send-command",
        description: "Sends a command to managed instances",
        parameters: [
          { name: "--document-name <value>", description: "Name of the SSM document" },
          { name: "--instance-ids <value>", description: "Instance IDs to run command on" },
          { name: "--targets <value>", description: "Targets based on tags" },
          { name: "--parameters <value>", description: "Parameters for the document" },
          { name: "--comment <value>", description: "User-specified comment" },
          { name: "--timeout-seconds <value>", description: "Timeout in seconds" }
        ]
      },
      {
        name: "list-commands",
        description: "Lists the commands requested",
        parameters: [
          { name: "--command-id <value>", description: "Command ID" },
          { name: "--instance-id <value>", description: "Instance ID" },
          { name: "--max-results <value>", description: "Maximum number of results" }
        ]
      },
      {
        name: "get-command-invocation",
        description: "Returns detailed information about a command",
        parameters: [
          { name: "--command-id <value>", description: "Command ID" },
          { name: "--instance-id <value>", description: "Instance ID" },
          { name: "--plugin-name <value>", description: "Name of the plugin" }
        ]
      },
      {
        name: "cancel-command",
        description: "Cancels a command",
        parameters: [
          { name: "--command-id <value>", description: "Command ID to cancel" },
          { name: "--instance-ids <value>", description: "Instance IDs to cancel on" }
        ]
      },
      {
        name: "get-parameter",
        description: "Gets a parameter from Parameter Store",
        parameters: [
          { name: "--name <value>", description: "Name of the parameter" },
          { name: "--with-decryption", description: "Decrypt SecureString parameters" }
        ]
      },
      {
        name: "get-parameters",
        description: "Gets multiple parameters",
        parameters: [
          { name: "--names <value>", description: "Names of the parameters" },
          { name: "--with-decryption", description: "Decrypt SecureString parameters" }
        ]
      },
      {
        name: "get-parameters-by-path",
        description: "Gets parameters by path",
        parameters: [
          { name: "--path <value>", description: "Parameter path hierarchy" },
          { name: "--recursive", description: "Retrieve all parameters in hierarchy" },
          { name: "--with-decryption", description: "Decrypt SecureString parameters" },
          { name: "--max-results <value>", description: "Maximum number of results" }
        ]
      },
      {
        name: "put-parameter",
        description: "Creates or updates a parameter",
        parameters: [
          { name: "--name <value>", description: "Name of the parameter" },
          { name: "--value <value>", description: "Parameter value" },
          { name: "--type <value>", description: "String, StringList, or SecureString" },
          { name: "--description <value>", description: "Description of the parameter" },
          { name: "--overwrite", description: "Overwrite existing parameter" },
          { name: "--key-id <value>", description: "KMS key ID for SecureString" },
          { name: "--tags <value>", description: "Tags for the parameter" }
        ]
      },
      {
        name: "delete-parameter",
        description: "Deletes a parameter",
        parameters: [
          { name: "--name <value>", description: "Name of the parameter to delete" }
        ]
      },
      {
        name: "delete-parameters",
        description: "Deletes multiple parameters",
        parameters: [
          { name: "--names <value>", description: "Names of parameters to delete" }
        ]
      },
      {
        name: "describe-parameters",
        description: "Lists parameters",
        parameters: [
          { name: "--filters <value>", description: "Filters to limit results" },
          { name: "--parameter-filters <value>", description: "Parameter filters" },
          { name: "--max-results <value>", description: "Maximum number of results" }
        ]
      },
      {
        name: "start-session",
        description: "Starts a Session Manager session",
        parameters: [
          { name: "--target <value>", description: "Instance ID to connect to" },
          { name: "--document-name <value>", description: "SSM document for session" },
          { name: "--parameters <value>", description: "Session parameters" }
        ]
      },
      {
        name: "terminate-session",
        description: "Terminates a session",
        parameters: [
          { name: "--session-id <value>", description: "Session ID to terminate" }
        ]
      },
      {
        name: "describe-sessions",
        description: "Lists sessions",
        parameters: [
          { name: "--state <value>", description: "Session state (Active, History)" },
          { name: "--max-results <value>", description: "Maximum number of results" },
          { name: "--filters <value>", description: "Filters for sessions" }
        ]
      },
      {
        name: "describe-instance-information",
        description: "Describes managed instances",
        parameters: [
          { name: "--instance-information-filter-list <value>", description: "Filters" },
          { name: "--filters <value>", description: "Instance filters" },
          { name: "--max-results <value>", description: "Maximum number of results" }
        ]
      },
      {
        name: "get-inventory",
        description: "Gets inventory information",
        parameters: [
          { name: "--filters <value>", description: "Filters for inventory" },
          { name: "--aggregators <value>", description: "Aggregators for results" },
          { name: "--max-results <value>", description: "Maximum number of results" }
        ]
      },
      {
        name: "create-patch-baseline",
        description: "Creates a patch baseline",
        parameters: [
          { name: "--name <value>", description: "Name of the patch baseline" },
          { name: "--operating-system <value>", description: "Operating system" },
          { name: "--approval-rules <value>", description: "Approval rules" },
          { name: "--approved-patches <value>", description: "List of approved patches" }
        ]
      },
      {
        name: "get-patch-baseline",
        description: "Gets a patch baseline",
        parameters: [
          { name: "--baseline-id <value>", description: "ID of the patch baseline" }
        ]
      },
      {
        name: "describe-patch-baselines",
        description: "Lists patch baselines",
        parameters: [
          { name: "--filters <value>", description: "Filters for patch baselines" },
          { name: "--max-results <value>", description: "Maximum number of results" }
        ]
      },
      {
        name: "create-maintenance-window",
        description: "Creates a maintenance window",
        parameters: [
          { name: "--name <value>", description: "Name of the maintenance window" },
          { name: "--schedule <value>", description: "Schedule in cron format" },
          { name: "--duration <value>", description: "Duration in hours" },
          { name: "--cutoff <value>", description: "Cutoff time in hours" },
          { name: "--allow-unassociated-targets", description: "Allow unassociated targets" }
        ]
      }
    ]
  },
  {
    name: "cloudwatch",
    description: "Amazon CloudWatch",
    commands: [
      { name: "put-metric-data", description: "Puts metric data", parameters: [{ name: "--namespace <value>", description: "Namespace" }, { name: "--metric-data <value>", description: "Metric data" }] },
      { name: "list-metrics", description: "Lists metrics", parameters: [] },
      { name: "get-metric-statistics", description: "Gets metric statistics", parameters: [{ name: "--namespace <value>", description: "Namespace" }, { name: "--metric-name <value>", description: "Metric name" }] },
      { name: "describe-alarms", description: "Describes alarms", parameters: [] }
    ]
  },
  {
    name: "events",
    description: "Amazon EventBridge",
    commands: [
      { name: "put-rule", description: "Creates a rule", parameters: [{ name: "--name <value>", description: "Rule name" }] },
      { name: "list-rules", description: "Lists rules", parameters: [] },
      { name: "put-targets", description: "Adds targets to rule", parameters: [{ name: "--rule <value>", description: "Rule name" }, { name: "--targets <value>", description: "Targets" }] }
    ]
  },
  {
    name: "wafv2",
    description: "AWS WAF V2",
    commands: [
      { name: "create-web-acl", description: "Creates a web ACL", parameters: [{ name: "--name <value>", description: "ACL name" }, { name: "--scope <value>", description: "Scope (REGIONAL|CLOUDFRONT)" }] },
      { name: "list-web-acls", description: "Lists web ACLs", parameters: [{ name: "--scope <value>", description: "Scope" }] }
    ]
  },
  {
    name: "inspector",
    description: "Amazon Inspector",
    commands: [
      { name: "create-assessment-template", description: "Creates assessment template", parameters: [{ name: "--assessment-target-arn <value>", description: "Target ARN" }] },
      { name: "list-findings", description: "Lists findings", parameters: [] }
    ]
  },
  {
    name: "securityhub",
    description: "AWS Security Hub",
    commands: [
      { name: "enable-security-hub", description: "Enables Security Hub", parameters: [] },
      { name: "get-findings", description: "Gets findings", parameters: [] },
      { name: "list-enabled-products-for-import", description: "Lists enabled products", parameters: [] }
    ]
  },
  {
    name: "shield",
    description: "AWS Shield",
    commands: [
      { name: "describe-subscription", description: "Describes subscription", parameters: [] },
      { name: "list-attacks", description: "Lists attacks", parameters: [] }
    ]
  },
  {
    name: "config",
    description: "AWS Config",
    commands: [
      { name: "put-configuration-recorder", description: "Creates config recorder", parameters: [{ name: "--configuration-recorder <value>", description: "Recorder config" }] },
      { name: "describe-configuration-recorders", description: "Describes recorders", parameters: [] },
      { name: "start-configuration-recorder", description: "Starts recorder", parameters: [{ name: "--configuration-recorder-name <value>", description: "Recorder name" }] }
    ]
  },
  {
    name: "detective",
    description: "Amazon Detective",
    commands: [
      { name: "create-graph", description: "Creates a behavior graph", parameters: [] },
      { name: "list-graphs", description: "Lists graphs", parameters: [] }
    ]
  },
  {
    name: "support",
    description: "AWS Support",
    commands: [
      { name: "create-case", description: "Creates a support case", parameters: [{ name: "--subject <value>", description: "Case subject" }, { name: "--communication-body <value>", description: "Case description" }] },
      { name: "describe-cases", description: "Describes cases", parameters: [] }
    ]
  },

  // Other Services
  {
    name: "datapipeline",
    description: "AWS Data Pipeline",
    commands: [
      { name: "create-pipeline", description: "Creates a pipeline", parameters: [{ name: "--name <value>", description: "Pipeline name" }, { name: "--unique-id <value>", description: "Unique ID" }] },
      { name: "list-pipelines", description: "Lists pipelines", parameters: [] }
    ]
  },
  {
    name: "codepipeline",
    description: "AWS CodePipeline",
    commands: [
      { name: "create-pipeline", description: "Creates a pipeline", parameters: [{ name: "--pipeline <value>", description: "Pipeline structure" }] },
      { name: "list-pipelines", description: "Lists pipelines", parameters: [] },
      { name: "start-pipeline-execution", description: "Starts pipeline execution", parameters: [{ name: "--name <value>", description: "Pipeline name" }] }
    ]
  },
  {
    name: "codecommit",
    description: "AWS CodeCommit",
    commands: [
      { name: "create-repository", description: "Creates a repository", parameters: [{ name: "--repository-name <value>", description: "Repository name" }] },
      { name: "list-repositories", description: "Lists repositories", parameters: [] },
      { name: "get-repository", description: "Gets repository info", parameters: [{ name: "--repository-name <value>", description: "Repository name" }] }
    ]
  },
  {
    name: "workdocs",
    description: "Amazon WorkDocs",
    commands: [
      { name: "describe-users", description: "Describes users", parameters: [{ name: "--organization-id <value>", description: "Organization ID" }] },
      { name: "describe-folders", description: "Describes folders", parameters: [] }
    ]
  },
  {
    name: "glue",
    description: "AWS Glue",
    commands: [
      { name: "create-database", description: "Creates a database", parameters: [{ name: "--database-input <value>", description: "Database input" }] },
      { name: "create-crawler", description: "Creates a crawler", parameters: [{ name: "--name <value>", description: "Crawler name" }] },
      { name: "start-crawler", description: "Starts a crawler", parameters: [{ name: "--name <value>", description: "Crawler name" }] },
      { name: "list-jobs", description: "Lists jobs", parameters: [] }
    ]
  },
  {
    name: "emr",
    description: "Amazon EMR",
    commands: [
      { name: "create-cluster", description: "Creates a cluster", parameters: [{ name: "--name <value>", description: "Cluster name" }, { name: "--release-label <value>", description: "Release label" }] },
      { name: "list-clusters", description: "Lists clusters", parameters: [] },
      { name: "describe-cluster", description: "Describes a cluster", parameters: [{ name: "--cluster-id <value>", description: "Cluster ID" }] }
    ]
  },
  {
    name: "apprunner",
    description: "AWS App Runner",
    commands: [
      { name: "create-service", description: "Creates a service", parameters: [{ name: "--service-name <value>", description: "Service name" }, { name: "--source-configuration <value>", description: "Source config" }] },
      { name: "list-services", description: "Lists services", parameters: [] }
    ]
  },
  {
    name: "acm",
    description: "AWS Certificate Manager",
    commands: [
      { name: "request-certificate", description: "Requests a certificate", parameters: [{ name: "--domain-name <value>", description: "Domain name" }] },
      { name: "list-certificates", description: "Lists certificates", parameters: [] },
      { name: "describe-certificate", description: "Describes a certificate", parameters: [{ name: "--certificate-arn <value>", description: "Certificate ARN" }] }
    ]
  },
  {
    name: "gamelift",
    description: "Amazon GameLift",
    commands: [
      { name: "create-fleet", description: "Creates a fleet", parameters: [{ name: "--name <value>", description: "Fleet name" }, { name: "--build-id <value>", description: "Build ID" }] },
      { name: "list-fleets", description: "Lists fleets", parameters: [] }
    ]
  }
];

// Search function to find matching services, commands, and parameters
export function searchAWSCommands(query: string): {
  type: 'service' | 'command' | 'parameter';
  service?: string;
  command?: string;
  displayText: string;
  fullCommand?: string;
  parameters?: CommandParameter[];
}[] {
  // Don't trim to preserve trailing spaces
  const hasTrailingSpace = query.endsWith(' ');
  const parts = query.trim().toLowerCase().split(/\s+/).filter(p => p.length > 0);
  const results: any[] = [];

  if (parts.length === 0) {
    return [];
  }

  // If query is just "aws" or empty after "aws", show all services
  if (parts.length === 1 && parts[0] === 'aws') {
    return awsServices.map(service => ({
      type: 'service' as const,
      service: service.name,
      displayText: `aws ${service.name}`,
      fullCommand: `aws ${service.name}`
    }));
  }

  // Remove 'aws' prefix if present
  const cleanParts = parts[0] === 'aws' ? parts.slice(1) : parts;

  if (cleanParts.length === 0) {
    return awsServices.map(service => ({
      type: 'service' as const,
      service: service.name,
      displayText: `aws ${service.name}`,
      fullCommand: `aws ${service.name}`
    }));
  }

  const servicePart = cleanParts[0];
  const commandPart = cleanParts.length > 1 ? cleanParts[1] : '';

  // If we have just a service part (no command yet)
  if (cleanParts.length === 1 && !hasTrailingSpace) {
    const matchingServices = awsServices.filter(service =>
      service.name.toLowerCase().includes(servicePart)
    );

    matchingServices.forEach(service => {
      results.push({
        type: 'service' as const,
        service: service.name,
        displayText: `aws ${service.name}`,
        fullCommand: `aws ${service.name}`
      });
    });

    return results;
  }

  // If we have a complete service (either with trailing space or with command part)
  if (cleanParts.length === 1 && hasTrailingSpace) {
    // Show all commands for this exact service
    const service = awsServices.find(s => s.name.toLowerCase() === servicePart);

    if (service) {
      service.commands.forEach(command => {
        results.push({
          type: 'command' as const,
          service: service.name,
          command: command.name,
          displayText: `aws ${service.name} ${command.name}`,
          fullCommand: `aws ${service.name} ${command.name}`,
          parameters: command.parameters
        });
      });
    }

    return results;
  }

  // If we have service and command parts (searching for commands)
  if (cleanParts.length >= 2) {
    const service = awsServices.find(s => s.name.toLowerCase() === servicePart);

    if (service) {
      const matchingCommands = service.commands.filter(cmd =>
        commandPart === '' || cmd.name.toLowerCase().includes(commandPart)
      );

      matchingCommands.forEach(command => {
        results.push({
          type: 'command' as const,
          service: service.name,
          command: command.name,
          displayText: `aws ${service.name} ${command.name}`,
          fullCommand: `aws ${service.name} ${command.name}`,
          parameters: command.parameters
        });
      });
    }
  }

  return results;
}
